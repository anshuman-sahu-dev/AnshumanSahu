# Anshuman Sahu — Portfolio Backend Service

Production REST API service powering the contact form, automated dual email notifications, anti-spam protections, and inquiry persistence for the personal developer portfolio.

---

## 🛠️ Technology Stack

- **Runtime:** Node.js (v20+ LTS)
- **Framework:** Express.js 4
- **Database:** MongoDB Atlas with Mongoose ODM
- **Email Delivery:** Nodemailer (Gmail SMTP integration)
- **Validation:** Joi
- **Security:** Helmet, express-mongo-sanitize, express-rate-limit, CORS
- **Testing:** Jest & Supertest

---

## 📂 Project Structure

```text
Backend/
├── src/
│   ├── config/             # DB connection (with DNS fallback), env parser, Nodemailer transporter
│   ├── controllers/        # Request controllers (inquiry.controller.js, health.controller.js)
│   ├── middlewares/        # Error handler, rate limiter, Joi validation middleware
│   ├── models/             # Mongoose models (Inquiry, Project)
│   ├── routes/             # Express routers (api.router.js, inquiry.routes.js, health.routes.js)
│   ├── services/           # Business logic (inquiry.service.js, email.service.js)
│   ├── utils/              # apiResponse, apiError, winston/console logger
│   ├── validators/         # Joi validation schemas (inquiry.validator.js)
│   └── app.js              # Express app setup and middleware pipeline
├── tests/                  # Automated integration tests (health.test.js, inquiry.test.js)
├── .env.example            # Environment template
├── .gitignore              # Ignores .env, node_modules, and PRD.md
├── nodemon.json            # Nodemon config watching src and .env
├── package.json            # Dependencies and test/start scripts
└── server.js               # Entry point, port binding, and graceful shutdown handlers
```

---

## 🚀 Running the Backend

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file based on `.env.example`:
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_character_app_password
SMTP_FROM="Your Name <your_email@gmail.com>"
NOTIFICATION_RECEIVER_EMAIL=your_admin_email@gmail.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Run Tests
```bash
npm test
```

---

## 📡 API Endpoints

### `GET /api/v1/health`
Checks database connectivity and server metrics.

### `POST /api/v1/inquiries`
Handles visitor inquiries:
1. Validates submitted payload against Joi schema.
2. Checks honeypot field `_gotcha` for spam bots.
3. Computes SHA-256 fingerprint hash to prevent duplicate submissions within 60s.
4. Saves inquiry to MongoDB Atlas.
5. Dispatches dual emails concurrently:
   - **Admin Notification:** `Request from <Org> for "<Type>"`
   - **Visitor Confirmation:** Thank you email with LinkedIn, Instagram, and Email links.
6. Returns HTTP 201 on success.
