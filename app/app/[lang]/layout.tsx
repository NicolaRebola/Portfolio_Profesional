import type { Metadata } from "next";
import HtmlLang from "@/app/_components/HtmlLang";
import SeoJsonLd from "@/app/_components/SeoJsonLd";
import { absoluteLocaleUrl } from "@/app/_constants/site";
import { getDictionary } from "@/app/_i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === "es" || lang === "en" ? lang : "en";
  const dict = getDictionary(locale);
  const seo = dict.seo as {
    title: string;
    description: string;
    keywords: string[];
  };

  const pageUrl = absoluteLocaleUrl(locale);

  return {
    title: {
      absolute: seo.title,
    },
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: absoluteLocaleUrl(locale),
      languages: {
        en: absoluteLocaleUrl("en"),
        es: absoluteLocaleUrl("es"),
        "x-default": absoluteLocaleUrl("en"),
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: pageUrl,
      siteName: "Nicola Rebola",
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
      type: "website",
    },
    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function LangLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}>) {
  const { lang } = await params;
  const safeLang = lang === "es" || lang === "en" ? lang : "en";
  const dict = getDictionary(safeLang);
  const pageUrl = absoluteLocaleUrl(safeLang);

  return (
    <>
      <SeoJsonLd pageUrl={pageUrl} jobTitle={String(dict.hero.title)} />
      <HtmlLang lang={safeLang} />
      <div className="relative min-h-screen overflow-x-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-background"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 55% 45% at 78% 18%, rgba(214,125,62,0.08) 0%, transparent 55%), radial-gradient(ellipse 45% 40% at 12% 72%, rgba(255,244,230,0.9) 0%, transparent 60%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,22,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,22,20,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 85% 85% at 50% 45%, black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 85% at 50% 45%, black 0%, transparent 100%)",
          }}
        />

        <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
      </div>
    </>
  );
}
