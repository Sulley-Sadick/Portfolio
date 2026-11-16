import fs from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv, type Plugin } from "vite";

import { BUILD_PAGE_SEO, CANONICAL_HOST } from "./seo.build-data.ts";

const FALLBACK_SITE_URL = `https://${CANONICAL_HOST}/`;

type SeoPage = (typeof BUILD_PAGE_SEO)[keyof typeof BUILD_PAGE_SEO];

function normalizeSiteUrl(raw: string | undefined): string {
  const candidate = raw?.trim();
  if (!candidate) return FALLBACK_SITE_URL;
  try {
    const parsed = new URL(candidate);
    parsed.hostname = CANONICAL_HOST;
    parsed.protocol = "https:";
    const href = parsed.href;
    return href.endsWith("/") ? href : `${href}/`;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

function canonicalForPage(siteRoot: string, pagePath: string): string {
  if (pagePath === "/") return `${siteRoot}/`;
  return `${siteRoot}${pagePath}`;
}

function patchHtmlForRoute(
  html: string,
  page: SeoPage,
  siteRoot: string,
  ogImage: string,
): string {
  const canonical = canonicalForPage(siteRoot, page.path);

  let next = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
    .replace(
      /meta name="description" content="[^"]*"/,
      `meta name="description" content="${page.description}"`,
    )
    .replace(
      /meta property="og:title" content="[^"]*"/,
      `meta property="og:title" content="${page.title}"`,
    )
    .replace(
      /meta property="og:description" content="[^"]*"/,
      `meta property="og:description" content="${page.description}"`,
    )
    .replace(/meta property="og:url" content="[^"]*"/, `meta property="og:url" content="${canonical}"`)
    .replace(
      /meta name="twitter:title" content="[^"]*"/,
      `meta name="twitter:title" content="${page.title}"`,
    )
    .replace(
      /meta name="twitter:description" content="[^"]*"/,
      `meta name="twitter:description" content="${page.description}"`,
    )
    .replace(/link rel="canonical" href="[^"]*"/, `link rel="canonical" href="${canonical}"`);

  if (!next.includes('rel="canonical"')) {
    next = next.replace(
      "</head>",
      `  <link rel="canonical" href="${canonical}" />\n  </head>`,
    );
  }

  if (!next.includes('property="og:image"')) {
    next = next.replace(
      "</head>",
      `  <meta property="og:image" content="${ogImage}" />\n  </head>`,
    );
  }

  return next;
}

function seoStaticFilesPlugin(siteUrl: string, basePath: string): Plugin {
  const routes = ["/", "/about", "/contact"];

  return {
    name: "seo-static-files",
    apply: "build",
    generateBundle() {
      const origin = new URL(siteUrl).origin;
      const base = basePath === "/" ? "" : basePath.replace(/\/$/, "");

      const loc = (pathname: string) => {
        if (pathname === "/") return `${origin}${base}/`;
        return `${origin}${base}${pathname}`;
      };

      const sitemapUrl = `${origin}${base}/sitemap.xml`;

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((routePath) => {
    const priority = routePath === "/" ? "1.0" : "0.8";
    return `  <url>
    <loc>${loc(routePath)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

      const robots = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: robots,
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: sitemap,
      });
    },
  };
}

function spaRouteHtmlPlugin(siteUrl: string, ogImage: string): Plugin {
  return {
    name: "spa-route-html",
    apply: "build",
    closeBundle() {
      const distDir = path.resolve(process.cwd(), "dist");
      const indexPath = path.join(distDir, "index.html");
      if (!fs.existsSync(indexPath)) return;

      const baseHtml = fs.readFileSync(indexPath, "utf8");
      const siteRoot = siteUrl.replace(/\/$/, "");

      fs.writeFileSync(
        indexPath,
        patchHtmlForRoute(baseHtml, BUILD_PAGE_SEO.home, siteRoot, ogImage),
      );

      for (const key of ["about", "contact"] as const) {
        const page = BUILD_PAGE_SEO[key];
        const html = patchHtmlForRoute(baseHtml, page, siteRoot, ogImage);
        const dir = path.join(distDir, key);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), html);
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE_PATH || "/";
  const siteUrl = normalizeSiteUrl(env.VITE_APP_URL);
  const ogImage = new URL("images/projects/portfolio.png", siteUrl).href;

  return {
    base,
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/motion")) return "motion";
            if (id.includes("node_modules/react-icons")) return "icons";
            if (id.includes("node_modules/@supabase")) return "supabase";
            if (
              id.includes("node_modules/react") ||
              id.includes("node_modules/react-dom") ||
              id.includes("node_modules/react-router")
            ) {
              return "react-vendor";
            }
          },
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      seoStaticFilesPlugin(siteUrl, base),
      spaRouteHtmlPlugin(siteUrl, ogImage),
      {
        name: "html-seo-placeholders",
        transformIndexHtml(html) {
          const siteRoot = siteUrl.replace(/\/$/, "");
          const baseUrl = base.endsWith("/") ? base : `${base}/`;
          return html
            .replaceAll("%SITE_URL%", siteRoot)
            .replaceAll("%OG_IMAGE%", ogImage)
            .replaceAll("%BASE_URL%", baseUrl);
        },
      },
    ],
  };
});