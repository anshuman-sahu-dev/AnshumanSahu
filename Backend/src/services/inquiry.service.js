const crypto = require('crypto');
const Inquiry = require('../models/inquiry.model');
const emailService = require('./email.service');
const logger = require('../utils/logger');

const inquiryService = {
  /**
   * Generates a unique fingerprint hash to prevent duplicate submissions
   */
  generateSubmissionHash: (email, name, description) => {
    const raw = `${email.trim().toLowerCase()}:${name.trim().toLowerCase()}:${description.trim().toLowerCase()}`;
    return crypto.createHash('sha256').update(raw).digest('hex');
  },

  /**
   * Checks if an identical submission was received within the specified cooldown window
   */
  checkDuplicateSubmission: async (submissionHash, windowSeconds = 60) => {
    const threshold = new Date(Date.now() - windowSeconds * 1000);
    return Inquiry.findOne({
      submissionHash,
      createdAt: { $gte: threshold },
    });
  },

  /**
   * Core contact workflow:
   * 1. Saves inquiry to MongoDB (Zero data loss guarantee).
   * 2. Sends both Admin notification and User confirmation emails.
   * 3. Updates delivery status flags.
   */
  createInquiry: async (inquiryData, clientMeta = {}) => {
    const submissionHash = inquiryService.generateSubmissionHash(
      inquiryData.email,
      inquiryData.name,
      inquiryData.description
    );

    // 1. Persist the inquiry into MongoDB first
    const inquiry = new Inquiry({
      inquiryType: inquiryData.inquiryType,
      name: inquiryData.name,
      email: inquiryData.email,
      company: inquiryData.company,
      phone: inquiryData.phone || null,
      website: inquiryData.website || null,
      description: inquiryData.description,
      submissionHash,
      meta: {
        ipHash: clientMeta.ipHash || null,
        userAgent: clientMeta.userAgent || null,
      },
      emailDelivery: {
        adminNotificationSent: false,
        confirmationSent: false,
        adminSentAt: null,
        confirmationSentAt: null,
        error: null,
      },
    });

    await inquiry.save();
    logger.info(`📝 Inquiry created and saved in MongoDB: ${inquiry._id} from ${inquiry.email}`);

    // 2. Dispatch dual emails concurrently
    const [adminResult, userResult] = await Promise.allSettled([
      emailService.sendAdminNotificationEmail(inquiry),
      emailService.sendConfirmationEmail(inquiry.email, inquiry.name),
    ]);

    const adminSent = adminResult.status === 'fulfilled';
    const userSent = userResult.status === 'fulfilled';

    // 3. Update delivery flags in MongoDB document
    inquiry.emailDelivery.adminNotificationSent = adminSent;
    inquiry.emailDelivery.confirmationSent = userSent;

    if (adminSent) {
      inquiry.emailDelivery.adminSentAt = new Date();
    } else {
      logger.error('❌ Failed to dispatch admin notification email:', adminResult.reason?.message);
    }

    if (userSent) {
      inquiry.emailDelivery.confirmationSentAt = new Date();
    } else {
      const userErrorMsg = userResult.reason?.message || 'Failed to dispatch confirmation email';
      logger.error('❌ Failed to dispatch user confirmation email:', userErrorMsg);
      inquiry.emailDelivery.error = userErrorMsg;
    }

    await inquiry.save();

    return {
      inquiry,
      confirmationSent: userSent,
      adminNotified: adminSent,
      error: userSent ? null : inquiry.emailDelivery.error,
    };
  },
};

module.exports = inquiryService;
