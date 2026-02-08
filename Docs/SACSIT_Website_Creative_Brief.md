# SACS-IT Website — Creative Brief
## For Web Developer
### February 2026 — Confidential

---

## 1. Project Overview

Build a professional, single-language (English) website for **SACS-IT**, a technology studio based in Beirut, Lebanon. The site will serve as the primary digital presence for attracting technology partnership inquiries.

**Domain:** sacsit.com
**Purpose:** Establish credibility, communicate capabilities, attract the right partners, filter out the wrong ones.
**This is NOT:** A sales funnel, a portfolio gallery, or an agency landing page.

---

## 2. Brand Identity

### Logo
The SACS-IT logo features organic layered rings (reminiscent of geological strata or tree rings) surrounding a geometric crystal/diamond icon at the center. Below the symbol: **SACS IT** in geometric uppercase typography, with the tagline **"INNOVATE TOGETHER"**.

**Logo files provided:**
- `SACS BLACK.svg / .png` — Black version, for light backgrounds
- `SACS DARK.svg / .png` — Purple version, for dark backgrounds
- `SACS WHITE.svg / .png` — White version, for dark backgrounds
- `SACS LIGHT.svg / .png` / `SACSIT LIGHT.png` — Purple version, for light backgrounds

**Location:** `Dropbox/marketing/2025/identities/LOGO/SACSIT/`

Use SVG versions for the website. The logo's layered ring metaphor (depth, layers of experience, geological time) should subtly inform the visual language of the site.

### Brand Colors

**Primary palette — derived from the logo:**

| Role | Color | Usage |
|------|-------|-------|
| Deep Purple | `#4A2B7A` (approx.) | Primary accent, headings, CTAs |
| Medium Purple | `#6B4FA0` (approx.) | Secondary elements, hover states |
| Lavender | `#9B7FC4` (approx.) | Subtle accents, borders, highlights |
| Navy / Near-Black | `#1B2A4A` | Body text, dark backgrounds |
| Off-White | `#F4F6FA` | Light backgrounds, sections |
| Medium Gray | `#6B7280` | Secondary text, captions |
| White | `#FFFFFF` | Clean backgrounds, contrast |

*Note to developer: Extract exact purple values from the SVG logo files. The above are approximations.*

### Typography Direction
- **Headings:** Geometric sans-serif — clean, modern, engineering-feel. Suggestions: Inter, DM Sans, or Outfit.
- **Body:** Highly readable sans-serif at comfortable size. No thin weights for body text.
- **Monospace accent** (optional): For technical capability labels or section tags.
- Overall: Professional, precise, not playful. No rounded "friendly" fonts.

---

## 3. Website Spirit & Tone

### The Feeling
The website should feel like walking into a precision engineering lab — clean, structured, confident. Every element is deliberate. Nothing decorative without purpose.

**Reference feel:** Stripe.com meets an industrial engineering consultancy. Linear.app's precision. Not a creative agency. Not a startup landing page.

### Tone of Voice
- **Confident but not arrogant** — Let the work speak. No superlatives ("best", "amazing", "revolutionary").
- **Precise, not poetic** — Technical depth communicated clearly. No jargon for jargon's sake.
- **Selective** — The tone implies "we choose our partners carefully" without saying it aggressively.
- **"We" voice** — First person plural. Not third person ("SACS-IT delivers..."). Direct.

### What the site must NOT feel like:
- A startup pitch deck asking for validation
- A freelancer portfolio begging for work
- A generic agency with stock photos and buzzwords
- A company trying to look bigger than it is

### Key Narrative Thread
The visitor should understand this arc without it being spelled out:
1. This team comes from industrial engineering — systems that cannot fail
2. They spent 7 years building enterprise platforms from scratch
3. Now they build production-grade SaaS platforms at unusual speed
4. They back their delivery with independently verified milestones

---

## 4. Site Structure & Page Content

### Navigation
Clean, minimal top navigation: **Home | Story | Capabilities | Engagement | Who We Work With | Contact**

---

### PAGE 1: Home

**Hero Section**

- Logo (dark version on light, or white version on dark hero)
- Headline: **"We Build Platforms That Work."**
- Subline: *"Enterprise-grade technology platforms — from architecture to production. Backed by 25 years of engineering depth and independently verified delivery."*
- Single CTA button: **"Start a Conversation"** → links to Contact

**Section: What We Do (3-4 short blocks)**

Three capability pillars, each with an icon and 1-2 lines:

1. **Platform Development** — "Complete SaaS and enterprise platforms, from database architecture to user interface. Production-grade."
2. **Industrial Automation & IoT** — "Unified industrial systems replacing SCADA, MES, CMMS, and ERP. Built from 16 years of field experience."
3. **AI Infrastructure** — "Intelligent agents, voice interaction systems, and multi-provider AI orchestration. Deployed in production."

**Section: The Foundation**

A brief narrative block (3-4 sentences max):

*"Our current capabilities are the direct result of 7 years building two enterprise platforms from the ground up — a real-time industrial operating system and a full-stack application framework. The architectural patterns, the domain-driven approach, and the security-by-default thinking carry into everything we build today. We didn't just learn how to code. We built the engines that power the code."*

**Section: Proof**

Simple stat bar or badge row (no specific numbers that reveal team size):

- **25 years** engineering experience
- **6 countries** across MENA
- **7 years** proprietary platform R&D
- **4+ platforms** delivered in 12 months

**Section: How We Deliver**

Brief teaser for the Engagement Model:

*"Milestone-driven. Working software at every checkpoint. With an option for independently verified delivery — every milestone certified by a third-party consultant before payment release."*

CTA: **"See Our Engagement Model"** → links to Engagement page

---

### PAGE 2: Story (About)

**The purpose of this page:** Tell the founder's arc. Build trust through depth, not decoration.

**Section: The Founder**

- Name: **Karim Gilbert Saikali**
- Title: Engineer · Architect · Operator
- Photo: *[If desired — professional headshot, or skip it entirely for a more studio-feel]*

**Section: Industrial Engineering (2001–2017)**

Narrative paragraph + categorized project highlights:

*"16 years delivering mission-critical systems across 6 countries in the MENA region. Oil & gas safety systems, water treatment plant automation, FMCG production lines, building automation for 25-tower complexes. Every project required zero tolerance for failure."*

Category highlights (can be expandable/accordion or a clean list):

- **Oil & Gas** — SCADA and safety systems for DEWA (Dubai), Banias Refinery (Syria), Dijla Petroleum, Al Furat Petroleum
- **Water & Infrastructure** — PLC/SCADA for Degremont–Suez, Subal, OTV–Veolia across Lebanon and Algeria
- **FMCG & Manufacturing** — Aujan Industries (Dubai), Procter & Gamble standards, batch control systems
- **HVAC & Building Automation** — JBR Dubai (25 towers, 12,000 fan coils, 150 AHUs), commissioned with APAVE
- **Energy & Load Management** — Four Seasons, Movenpick hotels

**Section: Platform R&D (2017–2024)**

*"In 2017, we shifted from project delivery to product development. Over 7 years, we designed and built two enterprise-grade technology platforms from the ground up — the kind of systems typically built by large corporations with dedicated engineering divisions."*

**SOP Platform — Unified Industry 4.0 Operating System**
- Brief description + bullet capabilities (from the profile)

**Petal.io — Enterprise Development Framework**
- Brief description + bullet capabilities (from the profile)

Closing paragraph:
*"The architectural depth from building these two platforms — a real-time industrial operating system and a full-stack application framework — is what powers our current development capabilities."*

**Section: Today**

*"In the past 12 months, we have delivered multiple production platforms in parallel across hospitality, marketplace, event management, and AI infrastructure domains. All capabilities described on this site have been demonstrated in production environments."*

---

### PAGE 3: Capabilities

**Intro line:** *"All capabilities listed below have been demonstrated in production environments."*

9 capability categories, each as a clean card or expandable section:

1. **Platform Architecture & Backend Infrastructure**
   - Cloud-native relational database with row-level security and per-tenant data isolation
   - Real-time data subscriptions, event-driven triggers, and serverless edge functions
   - Built-in authentication with multi-provider support (social, email, phone, SSO)
   - Auto-generated REST and real-time APIs from database schema
   - Webhook-driven event processing and third-party service integration
   - Object storage with policy-based access control
   - Configurable plan tiers, usage tracking, per-tenant rate limiting, and database version control

2. **Cloud Infrastructure & Security**
   - Enterprise-grade cloud infrastructure with auto-scaling to millions of concurrent users
   - Global edge network for low-latency content delivery worldwide
   - SOC 2 Type II, GDPR, ISO 27001 certified infrastructure
   - 99.9%+ uptime SLA with automated failover
   - DDoS protection and per-tenant rate limiting
   - End-to-end encryption: TLS in transit, AES-256 at rest
   - Automated backups with point-in-time recovery
   - Serverless architecture that scales with demand

3. **Web & Mobile Application Development**
   - Reactive web application architecture with server-side rendering
   - Admin and control panel solutions with role-based interfaces
   - Real-time dashboards and data visualization
   - Cross-platform mobile applications from a single codebase
   - Offline-first mobile architecture with background synchronization
   - Push notification infrastructure
   - Progressive Web App (PWA) capabilities

4. **AI Infrastructure & Intelligent Agents**
   - Multi-provider AI integration for speech-to-text, text-to-speech, and LLM orchestration
   - Real-time voice interaction with voice activity detection, streaming, and segmentation
   - Real-time communication infrastructure for audio and data channels
   - Webhook-driven AI agent logic with configurable workflows
   - Per-tenant AI credentials, rate limiting, and usage analytics

5. **Industrial Automation & IoT**
   - Unified platform replacing SCADA, MES, CMMS, and ERP
   - Proprietary real-time database engine
   - Native PLC drivers and IoT device integration
   - Industrial-grade alarming, archiving, and event management
   - No-code operational dashboards with proprietary symbol libraries
   - AI-ready gateway for machine learning and optimization

6. **Marketplace & Network Orchestration**
   - Multi-sided marketplace architecture with distinct participant roles and workflows
   - Cross-entity service aggregation and unified catalog management
   - Booking and reservation engine with real-time availability
   - Partner onboarding, lifecycle management, and cross-entity marketing infrastructure
   - Multi-geography network coordination

7. **CRM, Analytics & Business Intelligence**
   - Behavioral segmentation with automated campaign engines
   - Multi-entity group-level analytics and reporting
   - Contact lifecycle management with relationship mapping and household grouping
   - Real-time POS and hardware integration
   - Payment gateway integration with instant payment link generation

8. **Multi-Channel Communication**
   - SMS delivery via local and international providers
   - Messaging integration through platform-managed and user-owned routes
   - Email delivery infrastructure with template engines
   - Per-channel delivery tracking and analytics
   - Message open tracking capability

9. **Internationalization & Multi-Market Deployment**
   - Multi-language support (9 languages demonstrated) with native RTL rendering
   - Translation-ready data architecture at the database level
   - Per-tenant locale and language configuration
   - Culturally adapted UX per market segment

---

### PAGE 4: Engagement Model

**Section: How We Work**

*"We operate as a results-secured technology partner. Not a body shop. Not an agency that hands off a deliverable and disappears. We partner for the long term."*

**Milestone-Driven Delivery**
- Project scoped and priced by milestone, with clear acceptance criteria
- Working software delivered at every checkpoint
- Full transparency on progress

**Optional: Independently Verified Delivery**

*"For clients requiring additional assurance, we offer a bank-guaranteed delivery model adapted from industrial engineering practice:"*

- Independent third-party consultant (e.g. APAVE or equivalent) certifies completion of each milestone
- Bank-backed performance guarantee released only upon formal certification
- A model applied consistently by our founder across 16 years of industrial engineering contracts

*"In software development, this level of delivery assurance is virtually unheard of. We offer it because it is how our founder has always worked."*

**Ongoing Evolution**
- Post-delivery platform maintenance and evolution available on project or retainer basis

**Mutual Protection**
- NDAs executed before any technical discussion
- IP ownership terms defined upfront
- Development methodologies and tooling remain proprietary
- Client business logic and data remain confidential

---

### PAGE 5: Who We Work With (NEW)

**Intro:**
*"We are selective about partnerships. Not because we have limited capacity — but because deep technology work requires alignment between both parties. Here is who we work best with."*

**Section: Ideal Partners**

4 client type cards, each with a heading, 2-3 line description, and a subtle icon:

**1. Companies Building a Technology Platform**
*"You have domain expertise and market access, but you need a technical partner to architect and build the platform. You want a team that thinks in systems — not just features — and can take a concept to production."*

**2. Enterprises Digitizing Operations**
*"You operate in industry, hospitality, logistics, or services. You need custom platforms — not off-the-shelf SaaS — to transform how your business operates. Your requirements exceed what generic tools can deliver."*

**3. Funded Ventures Needing Architecture-First Development**
*"You have the vision and the resources. You need a partner who brings architectural depth — someone who designs for scale, security, and maintainability from day one, not after the first crisis."*

**4. Organizations That Have Been Burned Before**
*"You invested in a previous development effort that underdelivered. You need a partner willing to put results on the line — with milestone-driven delivery and, if needed, independently verified completion."*

**Section: Not the Right Fit**

Brief, respectful but clear:

*"We are not the right partner for:"*
- Simple websites or landing pages
- Projects evaluated primarily on hourly rate
- Staff augmentation or developer placement
- Engagements without clear ownership and decision-making on the client side

---

### PAGE 6: Contact

**Minimal, intentional.**

**Headline:** "Start a Conversation"

**Body:** *"All engagements begin with a mutual NDA and a discovery call. If there is a fit, we move to a scoped proposal with clear milestones."*

**Contact form (simple):**
- Name
- Company / Organization
- Email
- Brief description of the project or partnership interest
- Submit button: **"Get in Touch"**

**Alternative:** Direct email link — info@sacsit.com (or preferred address)

**Location mention:** Beirut, Lebanon (no full address needed)

---

## 5. Design Direction

### Layout Principles
- **Generous whitespace** — Let the content breathe. This is not a startup cramming information above the fold.
- **Grid-based, structured** — Engineering precision in the layout itself.
- **Asymmetric where it matters** — Not boring, but not flashy. Subtle off-grid moments.
- **No stock photography** — If images are used, they should be abstract (geometric patterns, layered textures echoing the logo, subtle gradients).
- **Icons over illustrations** — For capability categories, use minimal line icons. No cartoon-style illustrations.

### Visual Motifs (inspired by logo)
- **Layered rings / strata** — Can be used as subtle background textures or section dividers. Echoes the logo's organic rings.
- **Geological depth** — The idea of layers of experience. Subtle gradients from deep purple to lavender.
- **Geometric precision + organic flow** — The logo combines a precise diamond with organic rings. The site should do the same: structured grid with occasional organic touches.

### Dark vs. Light
- Recommended approach: **Dark hero sections** (navy/near-black) with white logo and text, alternating with **light content sections** (off-white) with dark text. Purple accents throughout.
- The Capabilities page can use subtle purple-tinted cards on an off-white background.
- The "Who We Work With" page can use a slightly darker treatment to feel distinct.

### Animations
- Minimal. No gratuitous parallax.
- Subtle fade-in on scroll for content sections.
- Smooth transitions on hover states.
- The layered rings from the logo could have a very subtle breathing/pulse animation on the home hero (optional — do NOT overdo this).

### Responsive
- Must work flawlessly on desktop, tablet, and mobile.
- Navigation collapses to hamburger on mobile.
- Capability cards stack vertically on mobile.

---

## 6. Confidentiality Rules — CRITICAL

The web developer must understand that certain information is **NEVER** to appear on the website:

| Protected Information | Rule |
|----------------------|------|
| Team size | Never mention number of developers or team members |
| Individual team members | Only the founder is named. No other names or roles. |
| Specific tech stack | Never mention Next.js, React, Supabase, Vercel, TypeScript, Tailwind, or any specific framework/tool |
| AI tooling | Never mention specific AI tools used in development |
| Development workflow | Never describe how the team works internally |
| Revenue or financial data | Never reference revenue, funding, or financial history |
| Product names | Never mention Reserviaa, VIP Marketplace, Wedding Platform, or Be My Guest by name |
| Client names (current) | Current SaaS clients are not named. Industrial-era clients (Veolia, DEWA, P&G, etc.) can be named. |

**The capabilities described are real. The specifics of HOW they are built are proprietary.**

---

## 7. Content Delivery

The following materials will be provided to the developer:

- [ ] This creative brief
- [ ] Logo files (SVG + PNG, all 4 variants)
- [ ] SACS-IT Capability Profile (PDF/markdown — for reference content)
- [ ] SACS-IT Verified Delivery Model (markdown — for Engagement page content)
- [ ] Founder photo (if decided to include)
- [ ] Any additional brand assets from `Dropbox/marketing/2025/identities/`

---

## 8. Technical Notes

- **Domain:** sacsit.com (already registered)
- **Language:** English only
- **SEO basics:** Meta titles, descriptions, Open Graph tags for social sharing
- **Performance:** Fast loading — minimal JavaScript, optimized images, lazy loading
- **Analytics:** Google Analytics or equivalent (to be decided)
- **SSL:** Required (HTTPS)
- **Hosting:** To be determined (discuss with SACS-IT)

---

*This brief is confidential and intended for the assigned web developer only.*

**SACS-IT — sacsit.com**
