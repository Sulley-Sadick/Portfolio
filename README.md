# Sulley Sadick — Front-End Developer Portfolio

Production-oriented portfolio for **Sulley Sadick**: featured projects, skills, professional journey, resume download, and a contact flow backed by Supabase.

**Live site:** [https://sulleysadick.dev](https://sulleysadick.dev)  
**Repository:** [github.com/Sulley-Sadick/Portfolio](https://github.com/Sulley-Sadick/Portfolio)

---

## Features

- **Multi-page SPA** — Home, About, and Contact (`react-router`)
- **Home** — Hero, mission, featured projects, journey timeline, skills toolkit
- **About** — Profile, skills, and professional milestones
- **Contact** — Form with validation; submission via Supabase Edge Functions
- **SEO** — Per-route meta tags, Open Graph / Twitter cards, JSON-LD (`Person`, `WebSite`, `ProfilePage`)
- **Build artifacts** — `sitemap.xml` and `robots.txt` generated at build time
- **Branding** — Custom favicon (SS monogram), `site.webmanifest`, dark theme with accent green
- **CI/CD** — GitHub Actions deploy to GitHub Pages with custom domain support
- **Resume** — PDF in `public/resume/`; editable source in `docs/resume.md` with a PDF generation script

---

## Tech stack

| Area | Technologies |
|------|----------------|
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Build | Vite 8, pnpm |
| Routing | React Router 8 |
| Motion | Motion |
| Forms / validation | Zod, custom `useForm` hook |
| Backend | Supabase (client + Edge Functions for contact) |
| HTTP | Axios (shared fetch layer) |
| Quality | ESLint, Prettier |

---

## Project structure

```
Portfolio/
├── public/                 # Static assets (favicon, resume PDF, project images)
├── src/
│   ├── pages/              # Route-level pages and sections
│   ├── features/           # Domain logic (about, projects, skills, contact)
│   ├── shared/             # Layouts, UI primitives, hooks, SEO, utilities
│   ├── config/             # Env, SEO, socials, public URLs
│   ├── libs/               # Supabase client, fetch helpers
│   └── providers/          # Scroll direction, routing context
├── supabase/functions/     # submit-contact, send-contact-email
├── docs/                   # Resume source, custom domain & resume guides
├── .github/workflows/      # Deploy to GitHub Pages
├── index.html              # Entry HTML (+ Google Search Console verification meta)
└── vite.config.ts          # Base path, Tailwind, sitemap/robots plugins
```

Site content (projects, journey, developer profile) lives mainly in `src/features/**/**.db.ts` and related constants.

---

## Prerequisites

- **Node.js** 22+ (matches CI)
- **pnpm** 9+ (`corepack enable`, then use the version in `package.json`)
- **Supabase project** (for contact form in production; optional for static UI-only local dev)

---

## Installation

```bash
git clone https://github.com/Sulley-Sadick/Portfolio.git
cd Portfolio
pnpm install
```

---

## Environment variables

Copy `.env.example` to `.env` and fill in values:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_BASE_PATH` | Yes | `/` for custom domain production |
| `VITE_APP_URL` | Yes | Canonical site URL, e.g. `https://sulleysadick.dev/` |
| `VITE_GITHUB_LINK` | Yes | GitHub profile URL |
| `VITE_EMAIL_LINK` | Yes | Public email |
| `VITE_WHATSAPP_LINK` | Yes | WhatsApp link |
| `VITE_LINKEDIN_LINK` | Yes | LinkedIn URL |
| `VITE_INSTAGRAM_LINK` | Yes | Instagram URL |
| `VITE_FACEBOOK_LINK` | Yes | Facebook URL |
| `VITE_PHONE_NUMBER` | Yes | Display / tel contact |
| `VITE_RESUME_LINK` | No | Path under `public/` or full URL; default `resume/Sulley-Sadick-Resume.pdf` |
| `VITE_SUPABASE_URL` | Yes* | Supabase project URL |
| `VITE_SUPABASE_PUBLISHER_KEY` | Yes* | Supabase anon/publishable key |
| `VITE_SERVER_URI` | No | Defaults to `VITE_APP_URL` |
| `VITE_GOOGLE_SITE_VERIFICATION` | No | Optional; verification meta is in `index.html` |

\*Required for contact submissions; the rest of the site can load without them.

**Production:** mirror the same names as **GitHub Actions secrets** (see `.github/workflows/deploy-github-pages.yml`). Only `.env.example` is committed.

---

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Vite dev server (HMR) |
| `pnpm build` | Typecheck + production build to `dist/` |
| `pnpm preview` | Serve `dist/` locally |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm resume:pdf` | Regenerate resume PDF from `docs/resume.md` |
| `pnpm supabase:deploy-contact` | Deploy contact Edge Functions + DB push |

---

## Local development

```bash
cp .env.example .env
# Edit .env with your values
pnpm dev
```

Open the URL Vite prints (typically `http://localhost:5173`).  
`BrowserRouter` respects `VITE_BASE_PATH` via `import.meta.env.BASE_URL`.

---

## Build and preview

```bash
pnpm build
pnpm preview
```

The build:

- Emits `sitemap.xml` and `robots.txt` using `VITE_APP_URL` and `VITE_BASE_PATH`
- Replaces `%SITE_URL%`, `%OG_IMAGE%`, and `%BASE_URL%` in `index.html`

---

## Deployment

### GitHub Pages

- Workflow: `.github/workflows/deploy-github-pages.yml`
- Triggers on push to `main` and manual **workflow_dispatch**
- Production uses `VITE_BASE_PATH=/`
- Copies `index.html` → `404.html` for SPA fallback on Pages

### Custom domain

See **`docs/custom-domain-setup.md`** for Namecheap DNS, GitHub Pages custom domain, HTTPS, and the `VITE_APP_URL` secret.

### Google Search Console

Submit `https://sulleysadick.dev/sitemap.xml` after deploy. The ownership meta tag lives in **`index.html`**.

---

## Contact backend (Supabase)

- Client: `src/libs/supabase/supabase-client.ts`
- Edge Functions: `supabase/functions/submit-contact`, `send-contact-email`
- Deploy: `pnpm supabase:deploy-contact` (Supabase CLI + linked project)

Do not commit real API keys; use `.env` locally and GitHub secrets in CI.

---

## Updating content

| Content | Location |
|---------|----------|
| Projects | `src/features/projects/projects.db.ts` + `public/images/projects/` |
| Skills | `src/features/skills/skills.db.ts` |
| Journey / milestones | `src/features/about/professional-journey.db.ts` |
| Developer profile | `src/features/about/developer.db.ts` |
| Resume | `docs/resume.md` → `pnpm resume:pdf` → `public/resume/` |

See `docs/resume-editing-guide.md` for the resume workflow.

---

## SEO

- Runtime: `src/shared/seo/SeoHead.tsx`, `StructuredData.tsx`
- Config: `src/config/seo.ts`
- Static fallbacks in `index.html`

---

## Author

**Sulley Sadick** — Front-End Developer

- Portfolio: [sulleysadick.dev](https://sulleysadick.dev)
- GitHub: [@Sulley-Sadick](https://github.com/Sulley-Sadick)

---

## License

This project is **private** (`"private": true` in `package.json`). All rights reserved unless otherwise noted.
