# Astro Marketing Site Template

A production-ready **Astro 5** + **Tailwind CSS 4** template for service businesses: multi-page sites, optional contact/quote forms (EmailJS), optional Cloudflare Turnstile, light/dark theme, SEO helpers, sitemap, and reusable section components.

This repository is intended to be **forked or copied** to spin up new client sites quickly. The instructions below are written so an **AI agent or developer** can genericize branding, trim pages to a **single landing**, or **add/remove features** with clear, repeatable steps.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Quick start](#quick-start)
3. [Environment variables](#environment-variables)
4. [Project structure](#project-structure)
5. [Configuration checklist (new site)](#configuration-checklist-new-site)
6. [Landing page vs multi-page site](#landing-page-vs-multi-page-site)
7. [Homepage sections (compose / remove)](#homepage-sections-compose--remove)
8. [Forms: enable, disable, or customize](#forms-enable-disable-or-customize)
9. [Navigation and footer](#navigation-and-footer)
10. [Branding and design tokens](#branding-and-design-tokens)
11. [SEO and sitemap](#seo-and-sitemap)
12. [Build and deploy](#build-and-deploy)
13. [Commands reference](#commands-reference)
14. [Notes for AI agents](#notes-for-ai-agents)

---

## Tech stack

| Layer | Choice |
|--------|--------|
| Framework | [Astro](https://astro.build/) 5 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Icons | Font Awesome Free (bundled) |
| Forms | Client-side [EmailJS](https://www.emailjs.com/) (`@emailjs/browser`) |
| Anti-spam | Honeypot field + optional [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) |
| Sitemap | Custom route `src/pages/sitemap.xml.ts` (manual URL list; `@astrojs/sitemap` is in dependencies if you want to wire the official integration later) |

---

## Quick start

```bash
npm install
cp env.example .env
# Edit .env if you use forms (see below)
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

```bash
npm run build    # output: ./dist/
npm run preview  # test production build locally
```

---

## Environment variables

Copy `env.example` to `.env`. All public keys use the `PUBLIC_` prefix (exposed to the browser).

| Variable | Required for forms | Purpose |
|----------|--------------------|---------|
| `PUBLIC_EMAILJS_SERVICE_ID` | Yes, to send mail | EmailJS service |
| `PUBLIC_EMAILJS_TEMPLATE_ID` | Yes | Template ID |
| `PUBLIC_EMAILJS_PUBLIC_KEY` | Yes | Public key (init + send) |
| `PUBLIC_TURNSTILE_SITE_KEY` | No | If set, Turnstile widget loads on form pages |

**EmailJS template variables** used by this project (align your EmailJS template fields):

- `{{from_name}}`, `{{from_phone}}`, `{{from_email}}`, `{{from_address}}`, `{{message}}`, `{{to_email}}`

If forms are **not** configured, the UI can show a fallback message pointing users to WhatsApp/email (see form scripts in `contato.astro` / `orcamento.astro`).

---

## Project structure

```text
/
├── public/                 # Static assets (favicon, images, logos)
│   └── assets/
├── src/
│   ├── components/
│   │   ├── layout/         # Header, Footer, WhatsAppButton
│   │   ├── sections/       # Hero, StatsBar, Services, FAQ, CTA, etc.
│   │   ├── seo/            # SEOHead, FAQSchema
│   │   └── ui/             # Button, Logo
│   ├── layouts/
│   │   └── BaseLayout.astro    # Shell: SEO, Header, main, Footer, theme, optional Turnstile script
│   ├── pages/              # File-based routes
│   │   ├── index.astro
│   │   ├── sobre-nos.astro
│   │   ├── servicos.astro
│   │   ├── contato.astro
│   │   ├── orcamento.astro
│   │   └── sitemap.xml.ts
│   ├── styles/
│   │   └── global.css      # Tailwind + CSS variables (palette, themes)
│   └── utils/
│       └── constants.ts    # SERVICES, DIFFERENTIALS, PROCESS_STEPS, CONTACT, etc.
├── astro.config.mjs        # site URL (canonical base for production)
├── env.example
└── package.json
```

**Section components** under `src/components/sections/` (use on homepage or custom pages):

- `Hero.astro` — full-width hero with image carousel background  
- `StatsBar.astro` — animated counters  
- `Services.astro`, `ValueProposition.astro`, `Process.astro`, `Testimonials.astro`, `FAQ.astro`, `CTA.astro`  
- **Available but not on homepage by default:** `Pricing.astro`, `Portfolio.astro` — import where needed  

---

## Configuration checklist (new site)

When cloning this repo for a **new client**, update at least:

1. **`astro.config.mjs`** — `site: 'https://your-domain.com'`
2. **`src/pages/sitemap.xml.ts`** — `SITE_URL` and the `pages` array (only list routes that exist)
3. **`src/utils/constants.ts`** — `CONTACT` (phone, WhatsApp, email, address, social URLs) and any content arrays (`SERVICES`, `DIFFERENTIALS`, `PROCESS_STEPS`)
4. **Every page’s `BaseLayout` props** — `title`, `description`, `keywords`, `canonical`, `url`, `image`
5. **`public/assets/logos/`** — replace logos; update paths in `Header.astro`, `Footer.astro`, `orcamento.astro` if filenames change
6. **`.env`** — EmailJS (+ optional Turnstile) if forms are used
7. **Portuguese copy** — currently `lang="pt-BR"` in `BaseLayout.astro`; change for other locales

---

## Landing page vs multi-page site

### Multi-page (default)

Routes:

| Path | File | Role |
|------|------|------|
| `/` | `index.astro` | Home with stacked sections |
| `/sobre-nos` | `sobre-nos.astro` | About |
| `/servicos` | `servicos.astro` | Services |
| `/contato` | `contato.astro` | Contact + form |
| `/orcamento` | `orcamento.astro` | Quote request + form |

**Agent instruction example:** *“Keep all pages; update copy and constants only.”*

### Single landing page

1. Put all needed sections in **`src/pages/index.astro`** only.  
2. **Delete** (or do not create) extra page files: `sobre-nos.astro`, `servicos.astro`, `contato.astro`, `orcamento.astro` as needed.  
3. **`Header.astro`** — remove or replace nav links; use in-page anchors (`#services`, `#contact`) instead of `/servicos`, `/contato`.  
4. **`Footer.astro`** — same: only links that exist.  
5. **`sitemap.xml.ts`** — set `pages` to `[{ url: '/', ... }]` (and any other routes you keep).  
6. Remove **CTA buttons** that point to deleted routes, or retarget them to `#contact` or external URLs.

**Agent instruction example:** *“Single-page site: one `index.astro`, anchor navigation, no `/orcamento` or `/contato` routes; optional form at bottom of home.”*

---

## Homepage sections (compose / remove)

Edit **`src/pages/index.astro`**: import only the sections you need and order them as desired.

```astro
---
import Hero from '../components/sections/Hero.astro';
import StatsBar from '../components/sections/StatsBar.astro';
// ...add or remove imports
---
<BaseLayout ...>
  <Hero />
  <StatsBar />
  <!-- remove StatsBar entirely if not needed -->
</BaseLayout>
```

- **StatsBar** data lives in `StatsBar.astro` (top of file).  
- **Services / FAQ / etc.** often read from `src/utils/constants.ts`.  

**Agent instruction example:** *“Remove StatsBar and Testimonials; add Portfolio section below Services.”*

---

## Forms: enable, disable, or customize

### Pages with forms

- **`src/pages/contato.astro`** — contact form + EmailJS script  
- **`src/pages/orcamento.astro`** — quote form + EmailJS script  

Both use:

- `novalidate` on `<form>` + JS validation (email regex, Portuguese messages)  
- Phone mask (Brazilian format) in JS  
- Honeypot field `company_website`  
- Optional Turnstile: `BaseLayout` prop `loadTurnstile={true}` when `PUBLIC_TURNSTILE_SITE_KEY` is set  

### Disable forms entirely

1. Delete or replace **`contato.astro`** / **`orcamento.astro`** with static content (phone, email, map only).  
2. Remove nav/footer links to `/contato` and `/orcamento`.  
3. Remove **`loadTurnstile`** from `BaseLayout` on those pages (or delete the pages).  
4. Optionally remove **`@emailjs/browser`** from `package.json` if nothing uses it.  

### Single form only (e.g. contact only)

- Keep **`contato.astro`**; remove **`orcamento.astro`** and all “Solicitar orçamento” / `/orcamento` links from `Header.astro`, `Footer.astro`, and section CTAs (`CTA.astro`, etc.).  
- Update **`sitemap.xml.ts`**.

### Add a field

1. Add `<input>` / `<textarea>` in the `.astro` file.  
2. Extend the `templateParams` object in the page’s `<script>` to include the new field.  
3. Add the same variable in the **EmailJS** template.  
4. Document it in **`env.example`** comments if useful.  

**Agent instruction example:** *“No forms: static contact page with WhatsApp and map only.”*

---

## Navigation and footer

- **`src/components/layout/Header.astro`** — desktop nav, mobile menu, CTA button, theme toggle, social icons (from `CONTACT`).  
- **`src/components/layout/Footer.astro`** — page links + contact block + copyright.  

Any **new route** must be added here (and in **sitemap**) or users will get 404s from the menu.

---

## Branding and design tokens

- **Colors / themes:** `src/styles/global.css` — `@theme` variables (`--color-dark-blue`, `--color-cyan`, `--color-yellow`, etc.) and `[data-theme="light"]` / `[data-theme="dark"]` overrides.  
- **Reusable UI:** `src/components/ui/Button.astro` (`primary`, `secondary`, `outline`).  
- **Dark-mode logo treatment example:** `.porto-seguro-logo-wrap` in `global.css` (Services page).  

**Agent instruction example:** *“Rebrand to green palette; update CSS variables and logo paths only.”*

---

## SEO and sitemap

- **`src/components/seo/SEOHead.astro`** — meta tags, OG, canonical (fed by each page).  
- **`src/pages/sitemap.xml.ts`** — manual list of URLs; keep in sync with real routes.  
- Set **`astro.config.mjs` `site`** for absolute URLs in production.  

---

## Build and deploy

```bash
npm run build
```

Deploy **`dist/`** to any static host (Vercel, Netlify, Cloudflare Pages, etc.). Set environment variables on the host to match `.env` for EmailJS/Turnstile.

---

## Commands reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server (default port 4321) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npx astro check` | Type/check Astro (if configured) |

---

## Notes for AI agents

Use this section as a **prompt cheat sheet** when genericizing the repo.

1. **Scope first:** Ask whether the site is **single landing** or **multi-page**, and whether **forms** are required.  
2. **Constants first:** Put all client-specific text and links in **`constants.ts`** where possible; avoid hardcoding in many files.  
3. **Routes are files:** Adding `/blog` = add `src/pages/blog.astro` (or folder); then Header, Footer, sitemap.  
4. **Forms need env + EmailJS template** fields to match `templateParams`.  
5. **Remove unused dependencies** after stripping features (e.g. EmailJS).  
6. **Language:** default UI strings are Portuguese; for English sites, search/replace user-facing copy and set `lang` on `<html>`.  

**Example high-level prompts:**

- *“Convert to a one-page agency site in English: hero, services grid, testimonials, contact strip with mailto only—remove EmailJS and all form pages.”*  
- *“Keep multi-page structure; replace RN Transportes with {CLIENT}; update colors to {HEX}; add a /blog index page.”*  
- *“Remove quote form and `/orcamento`; keep contact form with Turnstile.”*

---

## License

Use and adapt for client projects as needed. Original Astro starter portions may retain their respective licenses.
