const rateLimit = require('express-rate-limit');
const config = require('../config/env');
const apiResponse = require('../utils/apiResponse');

const inquiryRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return apiResponse.error(
      res,
      429,
      'Too many inquiries submitted from this IP. Please try again after 15 minutes.'
    );
  },
});

module.exports = {
  inquiryRateLimiter,
};
