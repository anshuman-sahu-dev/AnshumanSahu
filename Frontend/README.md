# Anshuman Sahu — Portfolio (Frontend)

A high-performance, responsive, and visually striking personal developer portfolio built with **React 19**, **Vite 8**, and **Tailwind CSS v4**. It features interactive 3D perspective tilts, custom retro-brutalist styling, fluid light/dark mode toggling, and multi-channel inquiry workflows.

---

## ⚡ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & custom CSS keyframes
- **Icons:** [Lucide React](https://lucide.dev/)
- **Analytics:** [@vercel/analytics](https://vercel.com/analytics)
- **Linter:** [oxlint](https://oxc.rs/)

---

## 📁 Directory Structure

```text
Frontend/
├── public/                     # Static assets (images, icons, resume PDF)
│   ├── Project/                # Project showcase posters & preview cards
│   ├── Resume/                 # Downloadable resume PDF
│   └── Testimonial/            # Mentor & client SVG avatar graphics
├── src/
│   ├── assets/                 # Profile photos & avatars
│   ├── components/             # Reusable UI components
│   │   ├── cards/              # ProjectCard, JobCard, TestimonialCard
│   │   ├── Footer/             # Footer component with navigation & social links
│   │   ├── Forms/              # HireMeModal, HireMeForm, FormField, useHireMeForm
│   │   ├── Header/             # Sticky Navbar with scroll progress & theme toggle
│   │   ├── Hero/               # Hero section with editorial typography & CTA
│   │   ├── Sections/           # Work, DayJob, Skills, About, Testimonials, Process, Contact, AskAI
│   │   └── UI/                 # Button, SectionHeading, ScrollRevealWrapper
│   ├── data/
│   │   └── portfolioData.js    # Data arrays driving projects, skills, education, & history
│   ├── hooks/                  # useTheme, useInkTrail, useClickStamp
│   ├── App.jsx                 # Master application layout
│   ├── index.css               # Design system tokens (@theme) & global CSS
│   └── main.jsx                # React DOM entry point
├── .env                        # Local environment variables
├── .gitignore                  # Frontend-specific ignore file
├── .oxlintrc.json              # Oxlint configuration
├── Frontend_PRD.MD             # Frontend Product Requirements Document
├── index.html                  # HTML template
├── package.json                # Dependencies and npm scripts
└── vite.config.js              # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher)
- npm (v9.0 or higher)

### Installation
From the repository root, navigate into the `Frontend` directory:

```bash
cd Frontend
npm install
```

### Development Server
Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
Compile and optimize for production:

```bash
npm run build
```
The output will be generated in `Frontend/dist/`.

### Preview Production Build
```bash
npm run preview
```

### Linting
Fast codebase linting via Oxlint:
```bash
npm run lint
```

---

## ⚙️ Environment Variables

The frontend reads variables prefixed with `VITE_` from `.env`:

```bash
# Inquiry Form Endpoint (Defaults to Formspree or custom backend API)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/meaorpyw

# Custom Backend API Endpoint (For future full-stack integration)
# VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## 🎨 Design System & Theme

- **Light Mode Background:** `#fbf6ea` (Paper), Text: `#1c1814` (Ink)
- **Dark Mode Background:** `#1c1814` (Dark Ink), Text: `#fbf6ea` (Light Paper)
- **Primary Accent:** `#ff6b1a` (Orange)
- **Secondary Accent:** `#23a05a` (Green)
- **Highlight:** `#ffd41f` (Yellow)
- **Typography:**
  - Display: `Archivo Black`
  - Marker/Handwritten: `Caveat`
  - Body: `Space Grotesk`
