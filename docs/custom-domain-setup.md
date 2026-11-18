# Custom domain (`sulleysadick.dev`)

Production builds use **site root** (`VITE_BASE_PATH=/`), not `/Portfolio/`.

**Canonical host:** `sulleysadick.dev` (apex). Live GitHub Pages already 301s `www` → apex; code, sitemap, and canonical tags must match that direction.

## GitHub repository secret (required)

**Settings → Secrets and variables → Actions → Repository secrets**

| Secret           | Set to                         |
|------------------|--------------------------------|
| `VITE_APP_URL`   | `https://sulleysadick.dev/`    |

Keep existing secrets (`VITE_SUPABASE_URL`, social links, etc.) unchanged.

After updating, push to `main` or re-run **Deploy to GitHub Pages**.

## `CNAME` file

`public/CNAME` must be **`sulleysadick.dev`**. GitHub Pages uses this as the custom domain.

## Namecheap + GitHub Pages (apex-first)

- **`@` (apex)** → GitHub Pages **A** records (or ALIAS/ANAME if your DNS supports it)
- **`www`** CNAME → `sulley-sadick.github.io` (or a URL redirect from `www` → `https://sulleysadick.dev`)
- **GitHub:** Portfolio repo → Settings → Pages → custom domain **`sulleysadick.dev`** → Enforce HTTPS
- Confirm Pages continues to redirect `www` → apex (one direction only)
- **Do not** create conflicting redirects (e.g. apex → www while Pages redirects www → apex)
- **GitHub Pages source:** must be **GitHub Actions** (not “Deploy from branch / main”)

## Google Search Console

- Prefer the **https://sulleysadick.dev** (apex) property as primary.
- Submit sitemap: `https://sulleysadick.dev/sitemap.xml`
- After deploy, use **URL inspection** on `/`, `/about`, and `/contact` — each should return **200** on apex (not redirect).
- If a **www** property still exists, use change-of-address / remonitor so indexed URLs move to apex.
- The verification meta tag lives in **`index.html`** (static HTML). Do not put the full `<meta …>` in `VITE_GOOGLE_SITE_VERIFICATION`.
