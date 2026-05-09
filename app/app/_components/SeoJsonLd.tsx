import { socialLinks } from "@/app/_data/social";
import { SITE_BASE_PATH, SITE_ORIGIN } from "@/app/_constants/site";

export default function SeoJsonLd({
  pageUrl,
  jobTitle,
}: {
  pageUrl: string;
  jobTitle: string;
}) {
  const siteHome = `${SITE_ORIGIN}${SITE_BASE_PATH}/`;

  const sameAs = socialLinks
    .filter((l) => l.icon !== "email")
    .map((l) => l.url);

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${siteHome}#website`,
      url: siteHome,
      name: "Nicola Rebola",
      inLanguage: ["en", "es"],
    },
    {
      "@type": "Person",
      "@id": `${pageUrl}#person`,
      name: "Nicola Rebola",
      url: pageUrl,
      jobTitle,
      email: "nicolarebola.dev@gmail.com",
      sameAs,
      knowsLanguage: ["English", "Spanish"],
    },
  ];

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
