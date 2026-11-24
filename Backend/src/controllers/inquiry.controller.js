const crypto = require('crypto');
const inquiryService = require('../services/inquiry.service');
const apiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logger');

const inquiryController = {
  /**
   * POST /api/v1/inquiries
   * Handles incoming contact form submissions
   */
  submitInquiry: async (req, res, next) => {
    try {
      const { _gotcha } = req.body;

      // Anti-Spam: Honeypot check
      if (_gotcha && _gotcha.trim() !== '') {
        logger.warn(`🍯 Honeypot trap triggered by IP: ${req.ip}. Dropping silently.`);
        return apiResponse.success(res, 200, 'Inquiry received.');
      }

      // Compute client metadata
      const clientIp = req.ip || req.connection?.remoteAddress || '';
      const ipHash = clientIp
        ? crypto.createHash('sha256').update(clientIp).digest('hex')
        : null;
      const userAgent = req.get('user-agent') || 'unknown';

      // Duplicate prevention: Check for identical submission in last 60 seconds
      const submissionHash = inquiryService.generateSubmissionHash(
        req.body.email,
        req.body.name,
        req.body.description
      );

      const existingDuplicate = await inquiryService.checkDuplicateSubmission(submissionHash, 60);
      if (existingDuplicate) {
        logger.warn(`🔁 Duplicate submission detected from ${req.body.email}. Rejecting.`);
        throw ApiError.conflict('A duplicate submission was detected. Please wait a moment before sending another message.');
      }

      // Execute persistence and email workflow
      const result = await inquiryService.createInquiry(req.body, { ipHash, userAgent });

      // PRD Requirement: Show success only when message is saved AND confirmation email is sent
      if (result.confirmationSent) {
        return apiResponse.success(
          res,
          201,
          'Thank you for reaching out! Your message has been received, and a confirmation email has been sent to your address.',
          {
            inquiryId: result.inquiry._id,
            receivedAt: result.inquiry.createdAt,
            confirmationSent: true,
          }
        );
      }

      // If saved in DB but confirmation email failed: Return 502 without losing data
      return apiResponse.error(
        res,
        502,
        'Your message was successfully received and saved, but we encountered an issue delivering your confirmation email. Anshuman will contact you shortly.',
        [
          {
            field: 'emailDelivery',
            message: result.error || 'Confirmation email dispatch failed',
          },
        ]
      );
    } catch (error) {
      next(error);
    }
  },
};

module.exports = inquiryController;
