import { useLayoutEffect } from "react";

import {
  SITE_NAME,
  defaultShareImageUrl,
  getPageSeo,
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
  }, [pathname]);

  return null;
}
