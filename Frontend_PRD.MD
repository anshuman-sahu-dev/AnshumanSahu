# Product Requirements Document (PRD)
## Portfolio Rebuild: HTML/CSS/JS to React + Tailwind CSS

---

## 1. Project Overview
**Goal:** To rebuild the existing personal portfolio website, transitioning it from vanilla HTML/CSS/JavaScript into a modern, scalable, and maintainable architecture using React and Tailwind CSS. The new site should retain all existing aesthetic details, micro-interactions, and animations while improving developer experience and component reusability. Additionally, a new Dark Mode will be introduced alongside the strictly preserved Light Mode design.
**Target Audience:** Recruiters, hiring managers, potential clients, and fellow developers looking at Anshuman Sahu's work, experience, and skill set.

## 2. Current Features Audit
Based on the analysis of the existing `index.html`, `style.css`, and `script.js` files, here is the audit of current features and content:

### **Sections & Content:**
- **Navigation:** Sticky navbar with logo, smooth-scrolling links (Work, Day Job, Skills, About), a "Hire Me" button, a small Light/Dark mode toggle emoji/icon immediately after the button, and a top scroll progress bar.
- **Hero Section:** Dynamic typography ("CODE IN. BUILD OUT."), SVG highlights, rotating ID chips, short bio, CTA buttons, and a tilted profile photo.
- **Marquees (Bands):** Auto-scrolling text bands (e.g., "WEB DESIGN ★ FULL STACK DEVELOPMENT...") moving both left and right.
- **Work / Projects:** Grid of 4 key projects (Alumni Network, Odisha Express, Swad-e-Dil, FINITECH EdTech) featuring hover 3D tilt effects, tech stack tags, and external links.
- **Day Job / Experience:** Timeline of internships, university education, certifications, and high school education displayed as interactive cards.
- **Skills:** A comprehensive "Toolbox" categorized into Languages, Backend, Frontend, Databases, Testing, Cloud/DevOps, AI Tools, IDEs, and Core CS with hover pop effects.
- **About Me:** Profile picture, biography, and a quick statistics row (internships, certifications, research papers, reply time).
- **Testimonials:** 3 quote cards from mentors and team leads.
- **How I Build:** 3-step process cards (Understand, Design + Develop, Test & Ship).
- **Contact / CTA:** Big stylized text, resume download button, external links, and a functional "click to copy email" button.
- **Footer:** Social links (LinkedIn, GitHub) and copyright info.

### **UI/UX Interactions & Animations (from `script.js` & `style.css`):**
- **Ink Trail:** Colorful dots following the mouse cursor.
- **Click Stamp:** Random text stamps ('NICE!', 'YES!', 'WOW', '★') appearing on mouse click.
- **3D Tilt Effect:** Gentle perspective tilt and glare effect on project images on mouse hover.
- **Scroll Reveals:** Sections and elements fading/sliding up as they come into view.
- **Scrollspy:** Navbar links actively highlighting based on scroll position.
- **Progress Bar:** A top bar filling up as the user scrolls down.
- **Back-to-Top Button:** Appears after scrolling past a certain point.
- **Copy to Clipboard:** Interactive email copy button with success feedback.

## 3. Tech Stack
- **Framework:** React.js (Using **Vite** for fast builds and optimized routing).
- **Styling:** Tailwind CSS (Replacing vanilla `style.css` for rapid UI development and utility-first styling).
- **Animations & Micro-interactions:** 
  - **Framer Motion:** For scroll reveals (`.reveal`), marquee loops, and complex layout animations.
  - **Custom Hooks:** For mouse tracking (Ink Trail) and intersection observers (Scrollspy).
- **Icons:** FontAwesome (existing) or Lucide-React.
- **Deployment:** Vercel or Netlify (since projects are already deployed there, it seamlessly integrates with React/Next.js).

## 4. Functional Requirements
- **Page-wise Breakdown:** Single-page application (SPA) retaining the existing anchor-link navigation.
- **Responsive Behavior:** 
  - The layout must seamlessly stack on mobile devices (e.g., project grids shifting from 2-columns to 1-column).
  - Hide non-essential visual flair (like ink trails) on mobile devices for performance and usability.
- **Interactions:**
  - The custom cursor (ink trail) and click stamp must be isolated into reusable React components or hooks.
  - The copy-to-clipboard functionality must use modern React state to show the "copied" message.
  - Project cards must maintain their 3D perspective hover effect.
  - **Theme Toggle:** A smooth toggle between Light and Dark Mode that remembers the user's selected theme. Dark Mode must be visually consistent with the existing design using a dark background, light text, accessible contrast, and suitable dark-theme colors while preserving typography, layout, hierarchy, cards, buttons, animations, and the overall creative aesthetic.

## 5. Non-Functional Requirements
- **Performance:** Optimize image loading (use WebP formats). Avoid re-rendering the entire DOM on mousemove for the ink trail by utilizing React refs or Canvas.
- **SEO:** Use semantic HTML tags (`<nav>`, `<section>`, `<article>`, `<footer>`). Include meta tags, open graph tags, and ensure proper heading hierarchy. If using Next.js, implement SSR/SSG.
- **Accessibility:** Ensure all images have descriptive `alt` texts (already mostly present). Maintain high color contrast. Ensure keyboard navigability across sections and links.
- **Scalability:** Content (projects, skills, experience) should be mapped from JSON/JS data arrays rather than hardcoded in JSX.

## 6. Component Architecture
Proposed React Folder & Component Tree (inside the `src/` directory):
```
src/
 ├── App.jsx
 ├── main.jsx
 ├── index.css
 ├── components/
 │    ├── Header/
 │    │    └── Navbar.jsx (Logo, Links, Scrollspy, Progress Bar, Theme Toggle)
 │    ├── Hero/
 │    │    └── Hero.jsx
 │    ├── MarqueeBanner.jsx
 │    ├── Sections/
 │    │    ├── Work.jsx (Maps over Projects array)
 │    │    ├── DayJob.jsx
 │    │    ├── Skills.jsx
 │    │    ├── About.jsx
 │    │    ├── Testimonials.jsx
 │    │    ├── Process.jsx
 │    │    └── Contact.jsx (Copy Email, Resume Download)
 │    ├── Footer/
 │    │    └── Footer.jsx
 │    ├── UI/
 │    │    ├── Button.jsx
 │    │    ├── SectionHeading.jsx
 │    │    └── ScrollRevealWrapper.jsx (Framer Motion wrapper)
 │    └── cards/
 │         ├── ProjectCard.jsx (3D hover logic)
 │         ├── JobCard.jsx
 │         ├── CredentialCard.jsx
 │         ├── EducationCard.jsx
 │         └── TestimonialCard.jsx
 ├── hooks/
 │    ├── useInkTrail.js
 │    └── useClickStamp.js
 └── data/
      └── portfolioData.js (JSON/JS arrays for projects, skills, etc.)
```

## 7. Design System (Tailwind Implementation)
**Colors:** (To be defined in `tailwind.config.js`)

*Light Mode (Unchanged):*
- `paper`: `#fbf6ea` (Background)
- `paper-2`: `#f4eddc` (Secondary Background)
- `ink`: `#1c1814` (Primary Text)
- `orange`: `#ff6b1a` (Primary Accent)
- `peach`: `#ffb25e`
- `yellow`: `#ffd41f`
- `green`: `#23a05a` (Secondary Accent)

*Dark Mode:*
- Needs visually consistent counterparts: dark background, light text, accessible contrast, and suitable dark-theme accent colors.

**Typography:**
- **Display:** `Archivo Black` (`font-display`)
- **Marker/Handwritten:** `Caveat` (`font-marker`)
- **Body:** `Space Grotesk` (`font-body`)

**Spacing & Border:** Thick solid borders (`3px solid var(--ink)`), sharp shadows (`6px 6px 0 var(--ink)`), and paper-like textures should be translated into custom Tailwind utility classes (e.g., `shadow-solid`, `border-ink`).

## 8. Migration Plan
1. **Setup:** Initialize React + Vite/Next.js project. Install Tailwind CSS and configure `tailwind.config.js` with the design system tokens (colors, fonts).
2. **Data Extraction:** Move all hardcoded content (Projects, Job history, Skills lists, Testimonials) into localized `data.js` or `data.json` files.
3. **Component Scaffolding:** Create the folder structure and empty structural components for each section.
4. **Styling & Layout:** Migrate HTML to JSX and translate `style.css` classes into Tailwind utility classes section by section.
5. **Logic & Interactivity:** 
   - Implement `Framer Motion` for scroll reveals and marquees.
   - Recreate the `script.js` features (Ink Trail, Click Stamps, 3D tilt, Scrollspy) as React Hooks (`useInkTrail`, `useClickStamp`, `useScrollspy`).
6. **Testing & Polish:** Verify responsive behavior on mobile and tablet. Test performance for memory leaks on the mousemove events.
7. **Deployment:** Connect the new repository to Vercel/Netlify for CI/CD.

## 9. Success Metrics
- **Visual Parity:** The React site looks and feels identical (or better) than the vanilla version.
- **Lighthouse Score:** Achieve 90+ in Performance, Accessibility, Best Practices, and SEO.
- **Code Quality:** Zero hardcoded data blocks in JSX (all driven by data files), modular components, and no vanilla DOM manipulation (`document.querySelector`) outside of React Refs.
- **Interactivity:** All micro-interactions (ink, stamps, tilts) function smoothly without frame-rate drops.
