const apiResponse = {
  success: (res, statusCode = 200, message = 'Success', data = null) => {
    const payload = {
      success: true,
      statusCode,
      message,
    };
    if (data !== null && data !== undefined) {
      payload.data = data;
    }
    return res.status(statusCode).json(payload);
  },

  error: (res, statusCode = 500, message = 'Internal Server Error', errors = []) => {
    const payload = {
      success: false,
      statusCode,
      message,
    };
    if (Array.isArray(errors) && errors.length > 0) {
      payload.errors = errors;
    }
    return res.status(statusCode).json(payload);
  },
};

module.exports = apiResponse;
