# Custom domain (`sulleysadick.dev`)

Production builds use **site root** (`VITE_BASE_PATH=/`), not `/Portfolio/`.

## GitHub repository secret (required after this change)

**Settings → Secrets and variables → Actions → Repository secrets**

| Secret           | Set to                        |
|------------------|-------------------------------|
| `VITE_APP_URL`   | `https://sulleysadick.dev/`   |

Keep existing secrets (`VITE_SUPABASE_URL`, social links, etc.) unchanged.

After updating, push to `main` or re-run **Deploy to GitHub Pages**.

## Google Search Console (HTML tag)

The verification meta tag lives in **`index.html`** (static HTML). Setting only `VITE_GOOGLE_SITE_VERIFICATION` was not enough before, because an earlier version injected the tag with JavaScript after load — Google’s verifier reads the first HTML response, not the React bundle.

Do **not** put the full `<meta …>` in `VITE_GOOGLE_SITE_VERIFICATION` — that broke builds by nesting HTML inside `content=""`. The token lives in `index.html` only; remove or fix the secret if it contains the whole tag.

## Namecheap + GitHub Pages

- **Advanced DNS:** four `A` records on `@` to GitHub IPs; `www` CNAME → `sulley-sadick.github.io`
- **Redirect Domain:** remove apex → www redirect
- **GitHub:** Portfolio repo → Settings → Pages → custom domain `sulleysadick.dev` → Enforce HTTPS
- **GitHub Pages source:** must be **GitHub Actions** (not “Deploy from branch / main”). Serving the repo root deploys raw `index.html` with `%BASE_URL%` and `/src/main.tsx`, which breaks the live site.
