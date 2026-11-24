const ApiError = require('../utils/apiError');

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorDetails = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message.replace(/['"]/g, ''),
    }));

    return next(
      new ApiError(400, 'Validation failed', errorDetails)
    );
  }

  // Replace req.body with sanitized and validated values
  req.body = value;
  next();
};

module.exports = validate;
