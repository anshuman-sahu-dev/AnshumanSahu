const ApiError = require('../utils/apiError');
const apiResponse = require('../utils/apiResponse');
const logger = require('../utils/logger');
const config = require('../config/env');

const errorHandler = (err, req, res, next) => {
  let error = err;

  // If error is not an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, error.errors || [], false, err.stack);
  }

  const { statusCode, message, errors } = error;

  // Log error details for server diagnostics
  if (statusCode >= 500) {
    logger.error(`[${req.method} ${req.originalUrl}] 💥 ${statusCode} - ${message}`);
    if (err.stack) {
      logger.error(err.stack);
    }
  } else {
    logger.warn(`[${req.method} ${req.originalUrl}] ⚠️ ${statusCode} - ${message}`);
  }

  return apiResponse.error(res, statusCode, message, errors);
};

module.exports = errorHandler;
