const dns = require('dns');
const mongoose = require('mongoose');
const config = require('./env');
const logger = require('../utils/logger');

// Ensure reliable SRV record resolution across all local network DNS configurations
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore in restricted execution contexts
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection runtime error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting reconnection...');
    });

    return conn;
  } catch (error) {
    logger.error('❌ MongoDB initial connection error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
