const app = require('./src/app');
const config = require('./src/config/env');
const connectDB = require('./src/config/db');
const logger = require('./src/utils/logger');

let server;

// Connect to MongoDB then start HTTP listener
connectDB()
  .then(() => {
    server = app.listen(config.port, () => {
      logger.info(`🚀 Server running in ${config.nodeEnv} mode on port ${config.port}`);
      logger.info(`👉 Health check: http://localhost:${config.port}/api/v1/health`);
    });
  })
  .catch((err) => {
    logger.error('Failed to start server due to database connection error:', err.message);
    process.exit(1);
  });

// Handle graceful shutdown
const gracefulShutdown = (signal) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unexpected exceptions
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down...', err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...', err);
  process.exit(1);
});
