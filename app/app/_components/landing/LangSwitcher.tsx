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
    <div className="flex items-center gap-2">
      {i18n.locales.map((locale) => {
        const isActive = locale === lang;
        return (
          <Link
            key={locale}
            href={`/${locale}/`}
            className={[
              "rounded-full px-3 py-1 text-sm transition-all",
              isActive
                ? "bg-accent text-white"
                : "text-muted hover:text-foreground",
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
