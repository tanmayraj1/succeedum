# Succeedum Website Context & Changelog

This document summarizes the major feature integrations, architectural updates, and layout fixes applied to the Succeedum website template.

## 1. Sanity Headless CMS Integration (Blogs)
- **Dynamic Blogs**: Updated `blog.html` and `blog-details.html` to fetch and render blog posts dynamically using the Sanity client, replacing static HTML blocks.
- **Sanity Studio Deployment**: Configured and deployed the Sanity Studio backend to `https://succeedum.sanity.studio`.
- **CORS Configuration**: Whitelisted `succeedum.org.uk` and `www.succeedum.org.uk` (as well as `localhost:8000`) in Sanity’s CORS settings so the frontend can securely fetch data.
- **Admin Access**: Added a global "Blog Admin Login 🔒" link to the footer for easy team access.

## 2. Canada Regional Integration
- **New Landing Page**: Created `ca/index.html` tailored for the Canadian market.
- **GEO-IP Routing**: Updated the global GEO-IP routing script (via `geojs.io`) across all `index.html` files. Visitors from Canada (IP Code `CA`) are now automatically prompted to visit the Canadian programs page.
- **Curriculum Implementation**: Integrated specific Canadian curriculums based on the provided PDF:
  - Ontario Curriculum (OSSD)
  - British Columbia Curriculum
  - Alberta Curriculum
  - Quebec Curriculum
- **Subject Optimization**: Replaced US-centric subjects and abbreviations with Canadian equivalents (e.g., Elementary to Calculus).

## 3. US Homepage Improvements (`us/index.html`)
- **State Exams Expansion**: Removed short-form abbreviations (NY, TX, FL, CA) in the hero section in favor of full, professional names (New York Regents, Texas STAAR, etc.).
- **New State Exam Section**: Injected a brand new, highly visible grid section detailing nationwide "State Exam Preparation" (including FAST, STAAR, Regents, CAASPP, SOL, MCAS, Milestones, LEAP, AASA, and EOC exams) without breaking existing layouts.

## 4. UK Homepage Fixes (`uk/index.html`)
- **Region Isolation**: Removed the UAE phone number from the UK page's footer so only the UK number is visible.
- **Hero Clean-up**: Removed the "Ofqual Aligned" floating badge from the hero section.

## 5. Contact Page Refinements (`contact.html`)
- **Contact Order**: Reordered the contact phone numbers strictly to **US - UK - UAE**.
- **Form Layout Fixes**: Stripped the clunky third-party `nice-select` styling from the "Country Code" and "Student's Class" dropdowns. They now feature a sleek, bottom-border-only design matching the standard text inputs perfectly.
- **Region Filtering**: Completely removed the `+91 (IND)` country code option from the contact form since India is not a serviced region.

## 6. Global Topbar Search Widget
- **Styling Overhaul**: Replaced the bug-prone `nice-select` plugin for the topbar category dropdown with a bulletproof CSS Flexbox pill shape in `assets/section-css/header.css`.
- **Link Disconnection**: Globally stripped the auto-redirect `onchange` javascript logic from the topbar select dropdown across all 60+ HTML files to prevent users from being routed to bad placeholder pages.

## 7. Global Social Media Updates
- **Facebook Links**: Executed a global find-and-replace script across the entire repository to update the old Facebook URL to the new official profile (`https://www.facebook.com/profile.php?id=61567991876980`).

## 8. Mobile Header Refinement (`assets/section-css/header.css`)
- **Unified Search Bar**: Reworked the broken mobile/tablet topbar (≤991px). Previously the scope dropdown and search field stacked into a disjointed block with a borderless, floating input. They are now a single clean rounded search pill (logo + hamburger sit on the row above it).
- **Scope Dropdown Hidden on Mobile**: The "All Classes" category `<select>` is hidden below 992px to remove visual clutter and give the search field full width.
- **Tighter Spacing**: Reduced topbar vertical padding so hero content sits higher on small screens.
- **CSS-only / Global**: All changes live in the shared `header.css` (imported by `style.css`), so the refinement applies to every page — root, regional (`us/`, `uk/`, `uae/`, `ca/`), and inner pages — with no per-file HTML edits.

## 9. Feedback Round — Regional Content, Contacts & Cleanup
- **Mobile Header**: Topbar search widget now fully hidden ≤991px (logo + hamburger only).
- **Global Home (`index.html`)**: Hero subtitle de-regionalised ("…helping students achieve academic success."). Header contact now US-UK-UAE (added US +1 440 529 2852). Floating WhatsApp routes to the UK number.
- **Footer (universal, all pages)**: Description trimmed to "…tailored to every student's learning journey." (dropped the country list). Footer "24/7 Support" now lists all three numbers, US first (US-UK-UAE). Offcanvas sidebar contacts left region-specific.
- **Trial Modal (49 pages)**: Added a country-code dropdown (US +1 / UK +44 / UAE +971) beside the phone field.
- **"Our Courses" random demo page**: `course-1.html` (random template courses) is no longer surfaced. Course tag chips repoint to their class/curriculum pages, "View All Courses" → `classes.html`, and every "Start Learning Today" CTA opens the trial modal (or `classes.html` where no modal exists).
- **CTA Lorem (21 pages)**: Replaced the "Excepteur sint occaecat…" demo paragraph with real copy.
- **UK Home (`uk/index.html`)**: Distinct copy for the Personalised Learning / Expert Tutors / Measurable Progress trio. Both "View All UK Programs" buttons (which only went to GCSE) now open the trial modal. Removed the Noida location from the menu sidebar.
- **About Page split**: The shared `about.html` mixed all regions' subjects. Created region-specific `about-uk.html`, `about-us.html`, `about-uae.html` (each showing only its own curriculum), fixed the lorem "Educator Support / Top Instructors / Award Winning" trio, and repointed each region's "About Us" nav to its own page. Global + Canada keep the shared `about.html`.
- **US Home (`us/index.html`)**: WhatsApp header link, hero button and floating widget all route to the UK number.

## 10. Feedback Round 2 — Stats, Canada Rebuild, Lead Popup
- **Classes Stat**: Global hero badge "5000+ Classes Delivered" → "100,000+ Classes Delivered" (region homes already showed 100,000+).
- **Canada Home (`ca/index.html`)**: Fully de-cloned from the US page. Hero (eyebrow, title, Canada flag SVG, subtitle, bullets), feature trio, stats label, K-12 journey, both program sections (8 category cards → Ontario/BC/Alberta/Quebec + subjects; 4 course cards → Canadian), CTA, meta tags, hero badges, about copy, timeline, testimonials and FAQ all rewritten for the Canadian curriculum. "View All" buttons open the trial modal; broken sub-page links point to the CA home.
- **Lead-Capture Popup**: New clickbait popup on all home pages — fires once **per session** (sessionStorage `demo_popup_done`) after a 5s delay, and is suppressed for the rest of the session once shown, closed, or submitted. Captures Name + Phone with a country-code dropdown only. All text colours set explicitly (heading white, subtitle `#eaf0ff` on solid blue) so the site's global `p{color:#666}` can't wash them out. Self-contained (inline CSS/JS), independent of Bootstrap. Country-code `<select>` is excluded from the global nice-select plugin (`active.js` → `$("select:not(.no-nice-select)")`, `active.js` cache-bust bumped to `v=8`) so it renders as a clean native dropdown with a custom arrow and a region-appropriate default (UK→+44, UAE→+971, US/CA/global→+1).
- **Our Programs (`course-1.html`)**: The orphaned random-course "Our Courses" template page was repurposed into an "Our Programs / Explore Tutoring by Region" page (UK/US/UAE/Canada cards → region homes); breadcrumb/title renamed; CTA → contact page.

---
*Generated by Antigravity.*
