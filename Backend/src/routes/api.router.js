const express = require('express');
const inquiryRoutes = require('./inquiry.routes');
const healthRoutes = require('./health.routes');

const router = express.Router();

// Mount child routes under /api/v1
router.use('/inquiries', inquiryRoutes);
router.use('/health', healthRoutes);

module.exports = router;
