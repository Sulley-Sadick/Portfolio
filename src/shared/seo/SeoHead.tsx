import { useLayoutEffect } from "react";

import {
  SITE_NAME,
  defaultShareImageUrl,
  getPageSeo,
  siteKeywords,
  absoluteRouteUrl,
} from "../../config/seo";
import { applyBrandHeadLinks } from "./brandHeadLinks";
import { applyMetaTags } from "./metaTags";

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

    applyBrandHeadLinks();
  }, [pathname]);

  return null;
}