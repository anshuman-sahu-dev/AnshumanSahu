class ApiError extends Error {
  constructor(statusCode, message, errors = [], isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(msg, errors = []) {
    return new ApiError(400, msg || 'Bad Request', errors);
  }

  static conflict(msg) {
    return new ApiError(409, msg || 'Conflict');
  }

  static tooManyRequests(msg) {
    return new ApiError(429, msg || 'Too Many Requests');
  }

  static internal(msg) {
    return new ApiError(500, msg || 'Internal Server Error', [], false);
  }

  static badGateway(msg, errors = []) {
    return new ApiError(502, msg || 'Bad Gateway', errors);
  }
}

module.exports = ApiError;
