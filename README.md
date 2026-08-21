# Anshuman Sahu - Personal Portfolio

A modern, scalable, and beautifully designed personal portfolio website showcasing my work, experience, and skills. Built with **React** and **Tailwind CSS**, it features seamless animations, micro-interactions, and a carefully crafted dual-theme (Light/Dark) aesthetic.

## 🚀 Portfolio Overview

This portfolio serves as my digital presence for recruiters, hiring managers, potential clients, and fellow developers. It leverages a maintainable React architecture while showcasing high-quality design, modern typography, and interactive flair. 

## ✨ Key Features

- **Responsive & Mobile-First Design:** Fluid layout that adapts perfectly from desktop to mobile screens.
- **Light & Dark Mode:** A seamless theme toggle that remembers user preference while maintaining visual consistency and contrast.
- **Micro-Interactions & Animations:** 
  - Mouse-tracking Ink Trail and Click Stamps.
  - 3D perspective tilt effects on project cards.
  - Smooth scroll reveals and page-load animations powered by Framer Motion.
- **Dynamic Navigation:** Sticky navbar with scrollspy highlighting and a scroll progress indicator.
- **Data-Driven Architecture:** All content (projects, experience, skills) is dynamically rendered from structured JSON/JS data arrays for easy updates.
- **Quick Contact:** Interactive "copy to clipboard" email function and resume download functionality.

## 💻 Tech Stack

- **Frontend Framework:** React.js (Bootstrapped with Vite)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Utilities:** `clsx`, `tailwind-merge`
- **Deployment:** Vercel

## 📂 Main Sections

1. **Hero:** Dynamic typography, short bio, CTA buttons, and a stylized profile section.
2. **Work (Projects):** Grid showcasing significant projects with interactive 3D hover effects.
3. **Day Job (Experience):** An interactive timeline of internships, education, and certifications.
4. **Skills:** Categorized technical toolbox highlighting languages, frontend, backend, AI tools, and more.
5. **About Me:** Biography, profile statistics, and academic highlights.
6. **Testimonials:** Insights and quotes from mentors and team leads.
7. **How I Build:** My 3-step development process: Understand ➔ Design + Develop ➔ Test & Ship.
8. **Contact:** Quick contact links, resume download, and a one-click email copy button.

## 🛠️ Projects Showcased

- **NIST University Alumni Network:** A full-featured platform connecting alumni, students, and the university. *(PHP, Laravel, MySQL, JavaScript)*
- **Odisha Express Metro Website:** Real-time metro route information connecting 150+ stations. *(React, Node.js, Tailwind CSS)*
- **Swad-e-Dil:** A modern, responsive web platform for a homemade cloud kitchen. *(React, Node.js, Tailwind CSS)*
- **FINITECH EdTech:** A comprehensive e-learning platform empowering students through digital curricula. *(React, Node.js, Tailwind CSS)*

## ⚙️ Installation and Local Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd anshuman-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   *The application will start at `http://localhost:5173/` by default.*

4. **Build for production:**
   ```bash
   npm run build
   ```
   *You can preview the production build locally with `npm run preview`.*

## 🏗️ Project Structure

```text
src/
 ├── assets/          # Static assets (images, fonts, icons)
 ├── components/      # Reusable React components (Hero, Footer, Cards, Sections)
 ├── data/            # JSON/JS data arrays (portfolioData.js) driving the content
 ├── hooks/           # Custom React hooks (e.g., useInkTrail, useClickStamp)
 ├── App.jsx          # Main application layout & component assembly
 ├── main.jsx         # React application entry point
 └── index.css        # Global CSS and Tailwind directives
```

## 🌐 Deployment

This project is optimized for deployment on **Vercel**. 
Since it is built with Vite, Vercel automatically detects the framework and configures the build settings out of the box.

## 📬 Author & Contact

**Anshuman Sahu**  
- **Role:** Full Stack / Frontend Developer & AI Enthusiast

*Feel free to reach out for collaborations, project inquiries, or job opportunities!*
