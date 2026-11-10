import { useLayoutEffect } from "react";

import {
  SITE_NAME,
  defaultShareImageUrl,
  getPageSeo,
  googleSiteVerification,
  siteKeywords,
  absoluteRouteUrl,
} from "../../config/seo";
import { publicAssetPath } from "../utils/publicAssetPath";
import { applyMetaTags, upsertLink } from "./metaTags";

type SeoHeadProps = {
  pathname: string;
};

export function SeoHead({ pathname }: SeoHeadProps) {
  useLayoutEffect(() => {
    const page = getPageSeo(pathname);
    const canonicalUrl = absoluteRouteUrl(page.path);
    const verification = googleSiteVerification();

    applyMetaTags({
      title: page.title,
      description: page.description,
      canonicalUrl,
      imageUrl: defaultShareImageUrl(),
      siteName: SITE_NAME,
      keywords: siteKeywords(),
    });

    const faviconHref = publicAssetPath("favicon.svg");
    upsertLink("icon", faviconHref, { type: "image/svg+xml" });
    upsertLink("apple-touch-icon", faviconHref);

    if (verification) {
      let meta = document.head.querySelector<HTMLMetaElement>(
        'meta[name="google-site-verification"]',
      );
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "google-site-verification";
        document.head.appendChild(meta);
      }
      meta.content = verification;
    }
  }, [pathname]);

  return null;
}
