const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    inquiryType: {
      type: String,
      required: [true, 'Inquiry type is mandatory'],
      enum: {
        values: ['job', 'freelance', 'collab', 'other'],
        message: '{VALUE} is not a supported inquiry type',
      },
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Work email is required'],
      trim: true,
      lowercase: true,
      index: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    company: {
      type: String,
      required: [true, 'Company or organization name is required'],
      trim: true,
      minlength: [2, 'Company name must be at least 2 characters'],
      maxlength: [100, 'Company name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      trim: true,
      default: null,
      maxlength: [25, 'Phone number exceeds maximum length of 25 characters'],
    },
    website: {
      type: String,
      trim: true,
      default: null,
      maxlength: [200, 'Website URL exceeds maximum length of 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Inquiry description is required'],
      trim: true,
      minlength: [30, 'Description must contain at least 30 characters'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'replied', 'archived'],
      default: 'unread',
      index: true,
    },
    submissionHash: {
      type: String,
      index: true, // Used for 60-second duplicate submission checks
    },
    meta: {
      ipHash: { type: String, default: null },
      userAgent: { type: String, default: null },
    },
    emailDelivery: {
      adminNotificationSent: { type: Boolean, default: false },
      confirmationSent: { type: Boolean, default: false },
      adminSentAt: { type: Date, default: null },
      confirmationSentAt: { type: Date, default: null },
      error: { type: String, default: null },
    },
  },
  {
    timestamps: true, // Automatically manages createdAt & updatedAt
    versionKey: false,
  }
);

// Compound indexes for querying recent inquiries by status
inquirySchema.index({ status: 1, createdAt: -1 });
inquirySchema.index({ email: 1, createdAt: -1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
