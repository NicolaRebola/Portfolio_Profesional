"use client";
import { Locale } from "@/app/_types/i18n";
import { ButtonGroup } from "@/components/tailgrids/core/button-group";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

function splitHash(path: string) {
  const idx = path.indexOf("#");
  if (idx === -1) return { base: path, hash: "" };
  return { base: path.slice(0, idx), hash: path.slice(idx) };
}

function getLocaleFromPath(path: string) {
  if (path.startsWith("/en")) return "en";
  return "es";
}

function replaceLeadingLocale(pathname: string, nextLocale: Locale) {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const parts = normalized.split("/");
  if (parts.length >= 2 && (parts[1] === "es" || parts[1] === "en")) {
    parts[1] = nextLocale;
    return parts.join("/") || `/${nextLocale}/`;
  }
  return `/${nextLocale}/`;
}

export function LangSwitcher({
  labels = { es: "ES", en: "EN" }
}: {
  labels?: Record<Locale, string>;
}) {
  const router = useRouter();
  const pathname = usePathname() || '/';

  const {current, target, hrefTarget} = useMemo(() => {
    const {base, hash} = splitHash(pathname);
    const current = getLocaleFromPath(base);
    const target: Locale = current === 'es' ? 'en' : 'es';
    const hrefTarget = replaceLeadingLocale(base, target);
    return { current, target, hrefTarget };
  }, [pathname]);

  return (
    <ButtonGroup>
      <button onClick={() => router.push(replaceLeadingLocale(pathname, 'es')	)}>es</button>
      <button onClick={() => router.push(replaceLeadingLocale(pathname, 'en'))}>en</button>
    </ButtonGroup>
  )
}