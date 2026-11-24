const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');

const config = require('./config/env');
const apiRouter = require('./routes/api.router');
const errorHandler = require('./middlewares/error.middleware');
const ApiError = require('./utils/apiError');

const app = express();

// Trust reverse proxies (Render, Railway, Fly.io, etc.)
app.set('trust proxy', 1);

// 1. Security Headers
app.use(helmet());

// 2. Cross-Origin Resource Sharing (CORS)
const allowedOrigins = [
  config.clientUrl,
  ...config.additionalAllowedOrigins,
  'http://localhost:5173',
  'http://localhost:3000',
  'https://anshumansahu.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Allow Vercel preview and production deployments
      if (
        /^https:\/\/([a-zA-Z0-9-_.]+\.)?anshumansahu(\.vercel\.app)?$/.test(origin) ||
        /^https:\/\/[a-zA-Z0-9-_.]*anshuman[a-zA-Z0-9-_.]*\.vercel\.app$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new ApiError(403, `CORS policy: origin ${origin} is not allowed`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// 3. Body Parsers with payload size limits (PRD: max 10kb)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 4. NoSQL Query Injection Sanitization
app.use(mongoSanitize());

// 5. HTTP Request Logging
if (config.nodeEnv !== 'test') {
  app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
}

// 6. Mount Master API Router
app.use('/api/v1', apiRouter);

// Root information route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Anshuman Sahu Portfolio Backend API Gateway is active',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      inquiries: '/api/v1/inquiries (POST)',
    },
  });
});

// 7. Handle 404 for undefined routes
app.use((req, res, next) => {
  next(new ApiError(404, `Cannot find ${req.method} ${req.originalUrl} on this server`));
});

// 8. Global Centralized Error Handler
app.use(errorHandler);

module.exports = app;
