# Anshuman Sahu — Personal Portfolio & Full-Stack Web Application

A production-grade, full-stack personal developer portfolio showcasing software engineering projects, technical capabilities, career journey, research publications, and interactive experiences.

Built with a decoupled **React 19 + Vite Frontend** and a robust, secure **Node.js + Express + MongoDB Atlas Backend**.

---

## 🏗️ Monorepo Architecture

```text
Anshuman Sahu/
│
├── Frontend/                       # Client-side SPA built with React 19 & Vite 8
│   ├── public/                     # Static assets (project screenshots, icons, resume PDF)
│   ├── src/                        # Components, layouts, hooks, and design system
│   │   ├── assets/                 # Profile avatars and brand graphics
│   │   ├── components/             # Reusable UI components & section layouts
│   │   │   ├── cards/              # Project, Job, and Testimonial cards
│   │   │   ├── Forms/              # Neo-brutalist contact modal & hire me forms
│   │   │   ├── Header/             # Navigation header
│   │   │   ├── Hero/               # Hero banner and introduction
│   │   │   ├── Sections/           # About, Skills, Work, DayJob, Testimonials, Contact
│   │   │   └── UI/                 # Core design primitives (Button, SectionHeading, etc.)
│   │   ├── data/                   # Structured portfolio projects and career data
│   │   ├── hooks/                  # Custom hooks (useTheme, useInkTrail, useClickStamp)
│   │   ├── App.jsx                 # Main application component
│   │   └── main.jsx                # Application DOM root
│   ├── .env                        # Frontend environment variables
│   ├── .gitignore                  # Frontend ignore rules
│   ├── index.html                  # HTML5 entry point
│   ├── package.json                # Frontend dependencies and npm scripts
│   └── vite.config.js              # Vite bundler configuration
│
├── Backend/                        # Production REST API Service
│   ├── src/                        # Application source code
│   │   ├── config/                 # Environment, MongoDB connection, & Nodemailer setup
│   │   ├── controllers/            # Request handlers (Inquiry, Health)
│   │   ├── middlewares/            # Error handling, rate limiting, and Joi validation
│   │   ├── models/                 # Mongoose schemas (Inquiry, Project)
│   │   ├── routes/                 # Express API routes
│   │   ├── services/               # Core business logic (DB persistence, email dispatch)
│   │   ├── utils/                  # Standardized API response, custom error, & logger
│   │   └── validators/             # Joi input validation schemas
│   ├── tests/                      # Jest & Supertest integration and unit test suite
│   ├── .env.example                # Template for environment configuration
│   ├── .gitignore                  # Backend ignore rules (excludes .env and PRD.md)
│   ├── nodemon.json                # Nodemon watcher configuration (watches src, .env)
│   ├── package.json                # Backend dependencies and scripts
│   └── server.js                   # Backend HTTP server entry point & graceful shutdown
│
├── .git/                           # Git repository history
├── .gitignore                      # Monorepo-level gitignore
└── README.md                       # Monorepo master documentation
```

---

## 💻 Tech Stack Overview

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with Neo-Brutalist design tokens
- **Animations:** Framer Motion, canvas-based particle bursts, ink trails
- **Icons:** Lucide React
- **Analytics:** Vercel Analytics

### Backend
- **Runtime:** Node.js (v20+ LTS)
- **Framework:** Express.js 4
- **Database:** MongoDB Atlas with Mongoose ODM (strict schema, indexing)
- **Email Delivery:** Nodemailer with Gmail SMTP
- **Security & Reliability:**
  - Helmet for secure HTTP response headers
  - Strict CORS origin whitelisting (`CLIENT_URL`, custom domains)
  - IP-based rate limiting via `express-rate-limit`
  - NoSQL injection sanitization via `express-mongo-sanitize`
  - Anti-spam Honeypot trap (`_gotcha`)
  - Dynamic SHA-256 duplicate submission window prevention
- **Testing:** Jest & Supertest

---

## ⚡ Key Full-Stack Features

### 1. Dual Automated Contact Form Workflow
- **Zero Data Loss Guarantee:** All incoming visitor inquiries are validated and saved into MongoDB Atlas first.
- **Admin Alert Email:** Dispatches an immediate notification to Anshuman with the dynamic subject:
  ```text
  Request from <Organization Name> for "<Type of Request>"
  ```
  *(e.g., `Request from Open Source Initiative for "Collaboration"` or `Request from Google for "Job Opportunity"`)*.
- **Automated Visitor Thank-You Email:** Sends a confirmation email to the visitor featuring:
  - Estimated 24-hour turnaround response pledge.
  - Direct social media links with embedded icons for **LinkedIn**, **Instagram**, and **Email**.
- **Resilient Fallback:** If email delivery fails for any reason, the inquiry remains safely stored in MongoDB and returns HTTP 502 with error details so no message is ever lost.

### 2. System Health & Diagnostics
- Dedicated health check endpoint (`GET /api/v1/health`) providing uptime metrics, memory usage, environment status, and real-time MongoDB connectivity verification.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js `v20.x` or higher
- npm or pnpm
- A MongoDB Atlas connection string
- A Gmail account with an App Password (for SMTP)

---

### Step 1: Clone & Configure

```bash
git clone https://github.com/anshuman-sahu-dev/portfolio.git
cd "Anshuman Sahu"
```

---

### Step 2: Setup and Run the Backend

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Fill in your actual credentials:
   ```env
   NODE_ENV=development
   PORT=5000
   CLIENT_URL=http://localhost:5173
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_16_character_app_password
   SMTP_FROM="Your Name <your_email@gmail.com>"
   NOTIFICATION_RECEIVER_EMAIL=your_admin_email@gmail.com
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:5000`.*

5. Run automated tests:
   ```bash
   npm test
   ```

---

### Step 3: Setup and Run the Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `Frontend/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The client will start on `http://localhost:5173`.*

---

## ☁️ Deploying to Vercel (Production Monorepo)

Deploy the repository on Vercel as two connected services (Frontend and Backend) connected to your GitHub repository (`anshuman-sahu-dev/AnshumanSahu`):

### 1. Deploy the Backend Service First
1. Log into your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New...** &rarr; **Project**.
2. Select your repository `AnshumanSahu` and click **Import**.
3. In **Project Name**, enter: `anshuman-portfolio-backend` (or a name of your choice).
4. In **Root Directory**, click **Edit** and select **`Backend`**.
5. Keep **Framework Preset** as **Other**.
6. Expand **Environment Variables** and add the following:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `<your_mongodb_atlas_connection_string>`
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_SECURE`: `false`
   - `SMTP_USER`: `<your_gmail_address>`
   - `SMTP_PASS`: `<your_gmail_app_password>`
   - `SMTP_FROM`: `"Anshuman Sahu <your_gmail_address>"`
   - `NOTIFICATION_RECEIVER_EMAIL`: `<your_email_for_inquiry_alerts>`
   - `CLIENT_URL`: `https://anshumansahu.vercel.app` (your frontend production domain)
7. Click **Deploy**.
8. Once deployed, copy your backend URL (e.g. `https://anshuman-portfolio-backend.vercel.app`).
9. Verify by visiting `https://<backend-url>/api/v1/health` in your browser. It should return `status: "UP"`, `database: "connected"`.

### 2. Deploy the Frontend Application
1. In your [Vercel Dashboard](https://vercel.com/dashboard), click **Add New...** &rarr; **Project**.
2. Select the same repository `AnshumanSahu` and click **Import**.
3. In **Project Name**, enter: `anshumansahu` (or your preferred frontend name).
4. In **Root Directory**, click **Edit** and select **`Frontend`**.
5. Vercel will automatically detect the **Vite** preset (`Build Command: npm run build`, `Output Directory: dist`).
6. Expand **Environment Variables** and add:
   - `VITE_API_BASE_URL`: `https://<your-backend-project>.vercel.app` (paste your deployed backend URL from Step 1).
7. Click **Deploy**.
8. Once deployed, visit your frontend URL (e.g. `https://anshumansahu.vercel.app`).

### 3. MongoDB Atlas Network Access (Critical)
Because Vercel serverless functions run across dynamic IP ranges:
- Log into [MongoDB Atlas](https://cloud.mongodb.com/).
- Navigate to **Security** &rarr; **Network Access**.
- Click **Add IP Address** &rarr; click **Allow Access from Anywhere** (`0.0.0.0/0`).
- Confirm. This enables your Vercel backend serverless function to connect securely to your database cluster.

---

## 📡 API Reference

### 1. Health Check
- **URL:** `/api/v1/health`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Portfolio API Gateway is healthy",
    "data": {
      "status": "UP",
      "uptime": 142.3,
      "environment": "development",
      "database": {
        "status": "connected",
        "readyState": 1
      }
    }
  }
  ```

---

### 2. Submit Inquiry
- **URL:** `/api/v1/inquiries`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Payload Schema:**
  ```json
  {
    "inquiryType": "job",
    "name": "Alex Carter",
    "email": "alex.carter@company.com",
    "company": "Tech Innovators Inc",
    "phone": "+1 555-019-2834",
    "website": "https://techinnovators.io",
    "description": "Hi Anshuman! We are impressed by your portfolio and would like to discuss a Full-Stack Engineer role.",
    "_gotcha": ""
  }
  ```
- **Responses:**
  - `201 Created`: Inquiry stored in database and confirmation email dispatched.
  - `400 Bad Request`: Field validation error (e.g., missing name or invalid email).
  - `409 Conflict`: Duplicate submission detected within 60 seconds.
  - `429 Too Many Requests`: Exceeded rate limit (max 5 submissions per 15 minutes per IP).
  - `502 Bad Gateway`: Stored safely in MongoDB, but email dispatch failed.

---

## 🛠️ Featured Portfolio Projects

1. **NIST University Alumni Network:** Official university alumni networking platform with mentorship, career opportunities, and collaborative directories. *(Laravel, PHP, MySQL, JavaScript)*
2. **Odisha Express Metro Website:** Real-time metro transit web application connecting 150+ stations with routes, timings, and fares. *(React.js, Tailwind CSS, Node.js)*
3. **Project Management System:** Full-stack, role-based project management platform with authentication, task allocation, and team collaboration tracking. *(React.js, Node.js, Express.js, MongoDB, Vercel)*
4. **FINITECH EdTech:** Comprehensive digital learning platform offering structured cohorts, project building, and live mentorship. *(React.js, Tailwind CSS, Node.js)*

---

## 📬 Contact & Connect

- **Direct Inquiries:** Submit via the [Live Portfolio Contact Form](https://anshumansahu.vercel.app)
- **LinkedIn:** [linkedin.com/in/anshuman-sahu-371a6535b](https://www.linkedin.com/in/anshuman-sahu-371a6535b/)
- **Instagram:** [@anshuman_sahu_06](https://www.instagram.com/anshuman_sahu_06)
- **Live Portfolio:** [https://anshumansahu.vercel.app](https://anshumansahu.vercel.app)
- **Location:** Brahmapur, Odisha, India

---

## 📄 License & Attribution

Designed and engineered with care by **Anshuman Sahu**. All rights reserved © 2026.
