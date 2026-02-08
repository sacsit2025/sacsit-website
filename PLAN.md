# SACS-IT Website Development Plan
## Progress Tracker

---

## Project Overview
- **Domain:** sacsit.com
- **Hosting:** Vercel
- **Tech Stack:** Next.js 16 + Tailwind CSS v4 + TypeScript
- **Language:** English only

---

## Design System

### Colors (from brand)
| Role | Hex | CSS Variable |
|------|-----|--------------|
| Deep Purple | `#4A2B7A` | `--color-primary` |
| Medium Purple | `#6B4FA0` | `--color-secondary` |
| Lavender | `#9B7FC4` | `--color-accent` |
| Navy / Near-Black | `#1B2A4A` | `--color-dark` |
| Off-White | `#F4F6FA` | `--color-light` |
| Medium Gray | `#6B7280` | `--color-muted` |
| White | `#FFFFFF` | `--color-white` |

### Typography
- **Headings:** Inter (geometric sans-serif)
- **Body:** Inter (400, 500 weights)
- **Monospace accent:** JetBrains Mono (for technical labels)

### Spacing Scale
- Based on 4px grid: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

---

## Site Structure

```
/                   → Home
/story              → Story (About/Founder)
/capabilities       → Capabilities (9 categories)
/engagement         → Engagement Model
/partners           → Who We Work With
/contact            → Contact Form
```

---

## Phase 1: Foundation - COMPLETED

- [x] Initialize Next.js 16 project with TypeScript
- [x] Configure Tailwind CSS v4 with custom design tokens
- [x] Set up project folder structure
- [x] Create global styles and CSS variables
- [x] Build reusable components:
  - [x] Button (primary, secondary, outline variants)
  - [x] Section (dark/light variants with proper spacing)
  - [x] Container (max-width wrapper)
  - [x] Navigation (desktop + mobile hamburger)
  - [x] Footer
  - [x] Card (for capabilities, partner types)
  - [x] StatBlock (for proof section)
  - [x] ExpandableCard (for capabilities list)
  - [x] FadeIn (scroll-triggered animations)
- [x] Set up layout with navigation and footer
- [x] Add logo assets to public folder

---

## Phase 2: Pages - COMPLETED

### Home Page
- [x] Hero section (dark background, headline, subline, CTA)
- [x] What We Do section (3 capability pillars)
- [x] The Foundation section (narrative block)
- [x] Proof section (stats bar: 25 years, 6 countries, 7 years R&D, 4+ platforms)
- [x] How We Deliver section (teaser + CTA to Engagement)

### Story Page
- [x] Founder section (name, title, placeholder photo)
- [x] Industrial Engineering timeline (2001-2017)
- [x] Project highlights by category (Oil & Gas, Water, FMCG, HVAC, Energy)
- [x] Platform R&D section (2017-2024)
- [x] SOP Platform description
- [x] Petal.io description
- [x] Today section

### Capabilities Page
- [x] Intro line
- [x] 9 capability cards (expandable):
  1. Platform Architecture & Backend Infrastructure
  2. Cloud Infrastructure & Security
  3. Web & Mobile Application Development
  4. AI Infrastructure & Intelligent Agents
  5. Industrial Automation & IoT
  6. Marketplace & Network Orchestration
  7. CRM, Analytics & Business Intelligence
  8. Multi-Channel Communication
  9. Internationalization & Multi-Market Deployment

### Engagement Page
- [x] How We Work intro
- [x] Milestone-Driven Delivery section
- [x] Independently Verified Delivery section (highlight)
- [x] Ongoing Evolution section
- [x] Mutual Protection section

### Who We Work With Page
- [x] Intro text
- [x] 4 Ideal Partner cards
- [x] "Not the Right Fit" section

### Contact Page
- [x] Headline and intro text
- [x] Contact form (Name, Company, Email, Message)
- [x] Form submission handling (Formspree integration)
- [x] Location mention (Beirut, Lebanon)
- [x] Alternative email display

---

## Phase 3: Polish & Animations - COMPLETED

- [x] Scroll-triggered fade-in animations (FadeIn component)
- [x] Button hover states
- [x] Card hover effects
- [x] Navigation scroll behavior (background change)
- [x] Subtle ring motif background elements (hero)
- [x] Loading states for form
- [x] Success/error states for form submission

---

## Phase 4: SEO & Performance - COMPLETED

- [x] Meta titles and descriptions for all pages
- [x] Open Graph tags for social sharing
- [x] Image optimization (Next.js Image component)
- [x] Lazy loading for below-fold content

---

## Phase 5: Launch Preparation - PENDING

- [ ] Connect sacsit.com domain to Vercel
- [ ] SSL verification (automatic with Vercel)
- [ ] Set up Formspree form ID (replace YOUR_FORM_ID in contact page)
- [ ] Add favicon and app icons
- [ ] Analytics setup (Google Analytics or Plausible)
- [ ] Final cross-browser testing
- [ ] Mobile device testing
- [ ] Content review and typo check
- [ ] Add founder photo (replace placeholder)

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Tech stack | Next.js + Tailwind + TS | Performance, Vercel integration, maintainability |
| Font | Inter + JetBrains Mono | Geometric, professional, great readability |
| Contact form | Formspree | Simple, no backend needed, reliable |
| Founder photo | Placeholder for now | User will add later |
| Animations | FadeIn on scroll | Per brief: subtle, not gratuitous |

---

## Files Reference

### Source Docs
- `/Docs/SACS-IT_Partner_Profile.md` - Company capabilities
- `/Docs/SACS-IT_Verified_Delivery_Model.md` - Delivery model details
- `/Docs/SACSIT_Website_Creative_Brief.md` - Design brief

### Logo Assets
- `/website/public/logo-dark.png` - Main logo
- `/website/public/petal-logo.png` - Petal.io logo
- `/website/public/sop-logo.png` - SOP Platform logo

### Components
- `/website/src/components/` - All reusable components
- `/website/src/app/` - All pages

---

## How to Run

```bash
cd website
npm run dev
# Open http://localhost:3000
```

## How to Deploy

```bash
# Push to GitHub, then connect repo to Vercel
# Or use Vercel CLI:
npx vercel
```

---

## Current Status

**Phase:** 4 - Complete (ready for launch preparation)
**Dev Server:** http://localhost:3000
**Last Updated:** February 8, 2026

---

## Remaining Tasks

1. **Formspree Setup:**
   - Create account at formspree.io
   - Create a new form
   - Replace `YOUR_FORM_ID` in `/website/src/app/contact/page.tsx`

2. **Deploy to Vercel:**
   - Push code to GitHub
   - Connect repo to Vercel
   - Add sacsit.com domain

3. **Final Polish:**
   - Add real founder photo
   - Add favicon
   - Test all forms and links

---
