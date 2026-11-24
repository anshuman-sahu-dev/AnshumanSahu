const express = require('express');
const inquiryController = require('../controllers/inquiry.controller');
const validate = require('../middlewares/validate.middleware');
const { inquirySchema } = require('../validators/inquiry.validator');
const { inquiryRateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

// POST /api/v1/inquiries
router.post(
  '/',
  inquiryRateLimiter,
  validate(inquirySchema),
  inquiryController.submitInquiry
);

module.exports = router;
