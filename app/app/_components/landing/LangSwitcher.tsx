import Link from "next/link";
import type { Locale } from "@/app/_types/i18n";
import { i18n } from "@/app/_i18n/config";

export function LangSwitcher({
  lang,
  labels = { es: "es", en: "en" },
}: {
  lang: Locale;
  labels?: Record<Locale, string>;
}) {
  return (
    <div className="inline-flex divide-x divide-white/20 overflow-hidden rounded-lg border border-white/20">
      {i18n.locales.map((locale) => {
        const isActive = locale === lang;
        return (
          <Link
            key={locale}
            href={`/${locale}/`}
            className={[
              "inline-flex min-h-11 min-w-11 items-center justify-center px-3.5 py-2.5 font-mono text-sm transition sm:min-h-0 sm:min-w-0",
              isActive
                ? "bg-white/10 text-white"
                : "bg-white/5 text-white/65 hover:bg-white/[0.08] hover:text-white",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {labels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
