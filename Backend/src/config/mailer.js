const nodemailer = require('nodemailer');
const config = require('./env');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
  tls: {
    rejectUnauthorized: config.nodeEnv === 'production',
  },
});

// Verify SMTP connection configuration if credentials are provided (skip in test mode)
if (config.nodeEnv !== 'test' && config.smtp.user && config.smtp.pass && config.smtp.pass !== 'your_gmail_app_password_here') {
  transporter.verify((error) => {
    if (error) {
      logger.warn(`⚠️ SMTP Verification failed: ${error.message}. Emails will fail until valid credentials are provided.`);
    } else {
      logger.info('✅ SMTP Mailer is verified and ready to dispatch emails');
    }
  });
} else if (config.nodeEnv !== 'test') {
  logger.info('ℹ️ SMTP credentials not configured in environment. In mock/dev mode, emails will be logged.');
}

module.exports = transporter;
