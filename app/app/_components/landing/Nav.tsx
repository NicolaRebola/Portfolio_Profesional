"use client";

import { useEffect, useState } from "react";
import { LangSwitcher } from "@/app/_components/landing/LangSwitcher";
import type { Locale } from "@/app/_types/i18n";

const SECTION_IDS = ["hero", "about", "experience", "stack", "blog", "contact"] as const;

type NavLabels = {
  about: string;
  experience: string;
  stack: string;
  blog: string;
  contact: string;
};

export default function Nav({
  lang,
  nav,
  logo = "NR/",
}: {
  lang: Locale;
  nav: NavLabels;
  logo?: string;
}) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const current = SECTION_IDS.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      setActiveSection(current ?? "");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links: { href: string; id: (typeof SECTION_IDS)[number]; label: string }[] = [
    { href: "#about", id: "about", label: nav.about },
    { href: "#experience", id: "experience", label: nav.experience },
    { href: "#stack", id: "stack", label: nav.stack },
    { href: "#blog", id: "blog", label: nav.blog },
    { href: "#contact", id: "contact", label: nav.contact },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6">
        <a
          href="#hero"
          className="font-[var(--font-syne)] text-xl font-bold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {logo}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                activeSection === l.id ? "text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangSwitcher lang={lang} />
        </div>
      </div>
    </nav>
  );
}
