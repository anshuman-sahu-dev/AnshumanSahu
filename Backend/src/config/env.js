const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  
  // CORS Configuration
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  additionalAllowedOrigins: (process.env.ADDITIONAL_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),

  // MongoDB Connectivity
  mongodbUri:
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_dev',

  // Nodemailer / SMTP
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || `"Anshuman Sahu" <${process.env.SMTP_USER || 'toanshumansahu@gmail.com'}>`,
  },

  // Notification Receiver
  notificationReceiverEmail:
    process.env.NOTIFICATION_RECEIVER_EMAIL || 'toanshumansahu@gmail.com',

  // Rate Limiting
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 mins
    maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // 5 requests per window
  },
};

module.exports = config;
