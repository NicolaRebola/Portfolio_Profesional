import type { ReactNode } from "react";
import Reveal from "@/app/_components/Reveal";

export default function Hero({
  tag,
  titlePlain,
  titleGradient,
  description,
  ctaPrimary,
  ctaSecondary,
}: {
  tag: string;
  titlePlain: ReactNode;
  titleGradient: ReactNode;
  description: ReactNode;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}) {
  return (
    <section id="hero" className="relative overflow-hidden px-6 pb-24 pt-32 lg:px-12">
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal className="mb-8" delayMs={0}>
          <div className="inline-flex items-center gap-2 rounded-full border border-success-border bg-success-bg px-4 py-2">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-success-dot" aria-hidden />
            <span className="text-sm text-success-text">{tag}</span>
          </div>
        </Reveal>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal
              as="h1"
              className="font-[var(--font-syne)] text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.02em]"
              delayMs={90}
            >
              <span className="block text-foreground">{titlePlain}</span>
              <span className="block text-accent italic">{titleGradient}</span>
            </Reveal>

            <Reveal className="mt-6 max-w-lg text-xl leading-relaxed text-muted" delayMs={180}>
              {description}
            </Reveal>

            <Reveal className="mt-10 flex flex-wrap gap-4" delayMs={260}>
              <a
                href={ctaPrimary.href}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-medium text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent-hover"
              >
                {ctaPrimary.label}
              </a>

              <a
                href={ctaSecondary.href}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-border px-8 py-4 text-base font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {ctaSecondary.label}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
