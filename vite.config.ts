import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";

const FALLBACK_SITE_URL = "https://sulleysadick.dev/";

function resolveSiteUrl(raw: string | undefined): string {
  const candidate = raw?.trim();
  if (!candidate) return FALLBACK_SITE_URL;
  try {
    const parsed = new URL(candidate);
    const normalized = parsed.href;
    return normalized.endsWith("/") ? normalized : `${normalized}/`;
  } catch {
    return FALLBACK_SITE_URL;
  }
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
  .map((path) => {
    const priority = path === "/" ? "1.0" : "0.8";
    return `  <url>
    <loc>${loc(path)}</loc>
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

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE_PATH || "/";
  const siteUrl = resolveSiteUrl(env.VITE_APP_URL);
  const ogImage = new URL("images/projects/portfolio.png", siteUrl).href;

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      seoStaticFilesPlugin(siteUrl, base),
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
