"use client";

import { useLayoutEffect } from "react";

/**
 * Keeps `<html lang>` in sync with the `[lang]` segment without injecting `<script>`
 * into the React tree (avoids hydration warnings; scripts in client subtrees don't SSR reliably).
 */
export default function HtmlLang({ lang }: { lang: "es" | "en" }) {
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
