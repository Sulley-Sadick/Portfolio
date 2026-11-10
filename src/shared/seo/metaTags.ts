type MetaAttr = "name" | "property";

function upsertMeta(attr: MetaAttr, key: string, content: string) {
  if (!content) return;
  const selector = `meta[${attr}="${key}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function upsertLink(
  rel: string,
  href: string,
  extra?: Record<string, string>,
) {
  if (!href) return;
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      element.setAttribute(key, value);
    }
  }
}

export type ApplyMetaTagsInput = {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  siteName: string;
  keywords?: string;
  twitterSite?: string;
};

export function applyMetaTags({
  title,
  description,
  canonicalUrl,
  imageUrl,
  siteName,
  keywords,
  twitterSite,
}: ApplyMetaTagsInput) {
  document.title = title;

  upsertMeta("name", "description", description);
  if (keywords) upsertMeta("name", "keywords", keywords);
  upsertMeta("name", "author", siteName);
  upsertMeta("name", "robots", "index, follow, max-image-preview:large");
  upsertMeta("name", "googlebot", "index, follow");

  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", siteName);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", canonicalUrl);
  upsertMeta("property", "og:image", imageUrl);
  upsertMeta("property", "og:locale", "en_US");

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", imageUrl);
  if (twitterSite) upsertMeta("name", "twitter:site", twitterSite);

  upsertLink("canonical", canonicalUrl);
}
