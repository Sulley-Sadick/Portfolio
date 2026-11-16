import { brandPortrait } from "../../config/branding";
import { publicAssetPath } from "../utils/publicAssetPath";
import { syncHeadLinks, type HeadLinkDescriptor } from "./metaTags";

const BRAND_FAVICON_LINKS: HeadLinkDescriptor[] = [
  {
    rel: "icon",
    href: publicAssetPath(brandPortrait.faviconIco),
    attrs: { sizes: "32x32" },
  },
  {
    rel: "icon",
    href: publicAssetPath(brandPortrait.png48),
    attrs: { type: "image/png", sizes: "48x48" },
  },
  {
    rel: "icon",
    href: publicAssetPath(brandPortrait.png192),
    attrs: { type: "image/png", sizes: "192x192" },
  },
  {
    rel: "apple-touch-icon",
    href: publicAssetPath(brandPortrait.png192),
  },
];

export function applyBrandHeadLinks(): void {
  syncHeadLinks(BRAND_FAVICON_LINKS);
}