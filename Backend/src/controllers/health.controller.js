const mongoose = require('mongoose');
const apiResponse = require('../utils/apiResponse');

const healthController = {
  /**
   * GET /api/v1/health
   * System uptime & database connection check
   */
  getHealth: (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;

    const data = {
      service: 'anshuman-portfolio-backend',
      status: isDbConnected ? 'UP' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      database: isDbConnected ? 'connected' : 'disconnected',
      uptimeSeconds: Math.floor(process.uptime()),
    };

    return apiResponse.success(res, 200, 'Service is healthy', data);
  },
};

module.exports = healthController;
