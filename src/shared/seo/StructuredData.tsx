import { useMemo } from "react";

import { DEVELOPER } from "../../features/about/developer.db";
import {
  PAGE_SEO,
  SITE_NAME,
  absoluteRouteUrl,
  defaultShareImageUrl,
  socialSameAs,
} from "../../config/seo";

export function StructuredData() {
  const jsonLd = useMemo(() => {
    const siteUrl = absoluteRouteUrl("/");
    const personId = `${siteUrl}#person`;

    return [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": personId,
        name: DEVELOPER.name,
        givenName: DEVELOPER.firstName,
        familyName: DEVELOPER.lastName,
        jobTitle: "Front-End Developer",
        url: siteUrl,
        image: defaultShareImageUrl(),
        email: DEVELOPER.email ? `mailto:${DEVELOPER.email}` : undefined,
        sameAs: socialSameAs(),
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: `${SITE_NAME} — Portfolio`,
        url: siteUrl,
        description: PAGE_SEO.home.description,
        inLanguage: "en",
        author: { "@id": personId },
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${absoluteRouteUrl("/about")}#profile`,
        name: PAGE_SEO.about.title,
        url: absoluteRouteUrl("/about"),
        description: PAGE_SEO.about.description,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": `${siteUrl}#website` },
      },
    ];
  }, []);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
