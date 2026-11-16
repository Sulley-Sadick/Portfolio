# Custom domain (`www.sulleysadick.dev`)

Production builds use **site root** (`VITE_BASE_PATH=/`), not `/Portfolio/`.

**Canonical host:** `www.sulleysadick.dev` (matches a Search Console **www** property and avoids “Page with redirect” when apex URLs redirect to www).

## GitHub repository secret (required)

**Settings → Secrets and variables → Actions → Repository secrets**

| Secret           | Set to                              |
|------------------|-------------------------------------|
| `VITE_APP_URL`   | `https://www.sulleysadick.dev/`     |

Keep existing secrets (`VITE_SUPABASE_URL`, social links, etc.) unchanged.

After updating, push to `main` or re-run **Deploy to GitHub Pages**.

## `CNAME` file

`public/CNAME` must be **`www.sulleysadick.dev`**. GitHub Pages uses this as the custom domain.

## Namecheap + GitHub Pages (www-first)

- **`www`** CNAME → `sulley-sadick.github.io`
- **`@` (apex)** → either GitHub `A` records **or** a **URL redirect** from `sulleysadick.dev` → `https://www.sulleysadick.dev` (301)
- **GitHub:** Portfolio repo → Settings → Pages → custom domain **`www.sulleysadick.dev`** → Enforce HTTPS
- **Do not** create conflicting redirects (e.g. www → apex and apex → www)
- **GitHub Pages source:** must be **GitHub Actions** (not “Deploy from branch / main”)

## Google Search Console

- Verify the **https://www.sulleysadick.dev** property.
- Submit sitemap: `https://www.sulleysadick.dev/sitemap.xml`
- After deploy, use **URL inspection** on `/`, `/about`, and `/contact` — each should return **200** (not redirect).
- The verification meta tag lives in **`index.html`** (static HTML). Do not put the full `<meta …>` in `VITE_GOOGLE_SITE_VERIFICATION`.