const Joi = require('joi');

const phoneRegex = /^\+?[\d\s\-().]{7,25}$/;

const inquirySchema = Joi.object({
  inquiryType: Joi.string()
    .valid('job', 'freelance', 'collab', 'other')
    .required()
    .messages({
      'any.only': 'Please select a valid inquiry type (job, freelance, collab, other)',
      'any.required': 'Inquiry type is required',
    }),

  name: Joi.string()
    .trim()
    .min(2)
    .max(80)
    .required()
    .messages({
      'string.empty': 'Your name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name must be under 80 characters',
      'any.required': 'Your name is required',
    }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      'string.empty': 'Your work email is required',
      'string.email': 'Please enter a valid work email address',
      'any.required': 'Your work email is required',
    }),

  company: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Company or organization name is required',
      'string.min': 'Company name must be at least 2 characters',
      'string.max': 'Company name must be under 100 characters',
      'any.required': 'Company or organization name is required',
    }),

  phone: Joi.string()
    .trim()
    .pattern(phoneRegex)
    .allow('', null)
    .optional()
    .messages({
      'string.pattern.base': 'Please enter a valid phone number',
    }),

  website: Joi.string()
    .trim()
    .uri({ scheme: [/https?/] })
    .allow('', null)
    .optional()
    .messages({
      'string.uri': 'Please enter a valid URL (e.g. https://example.com)',
    }),

  description: Joi.string()
    .trim()
    .min(30)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Please describe your inquiry',
      'string.min': 'Description must contain at least 30 characters',
      'string.max': 'Maximum 1,000 characters allowed in description',
      'any.required': 'Please describe your inquiry',
    }),

  _gotcha: Joi.string()
    .allow('', null)
    .optional(),
});

module.exports = {
  inquirySchema,
};
