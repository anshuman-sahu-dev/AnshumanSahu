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

let cachedPromise = null;

const connectDB = async () => {
  // Reuse existing connection if ready
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  try {
    cachedPromise = mongoose.connect(config.mongodbUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    const conn = await cachedPromise;
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection runtime error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      cachedPromise = null;
      logger.warn('MongoDB disconnected. Resetting cached connection.');
    });

    return conn;
  } catch (error) {
    cachedPromise = null;
    logger.error('❌ MongoDB initial connection error:', error.message);
    throw error;
  }
};

module.exports = connectDB;
