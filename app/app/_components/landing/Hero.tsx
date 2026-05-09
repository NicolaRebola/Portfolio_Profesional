import type { ReactNode } from "react";
import Reveal from "@/app/_components/Reveal";

export default function Hero({
  tag,
  titlePlain,
  titleGradient,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: {
  tag: string;
  titlePlain: ReactNode;
  titleGradient: ReactNode;
  subtitle: ReactNode;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}) {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-6 pb-16 pt-32">
      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 font-mono text-xs tracking-wide text-cyan-300"
          delayMs={0}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
          {tag}
        </Reveal>

        <Reveal as="h1" className="font-[var(--font-syne)] text-[clamp(2.8rem,6vw,5.5rem)] font-extrabold leading-[1] tracking-[-0.03em]" delayMs={90}>
          <span className="text-[color:var(--foreground)]">{titlePlain}</span>{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgb(99,102,241) 0%, rgb(168,85,247) 50%, rgb(6,182,212) 100%)",
            }}
          >
            {titleGradient}
          </span>
        </Reveal>

        <Reveal className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/60" delayMs={180}>
          {subtitle}
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap gap-4" delayMs={260}>
          <a
            href={ctaPrimary.href}
            className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 font-mono text-sm text-white"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgb(99,102,241), rgb(168,85,247))",
            }}
          >
            {ctaPrimary.label}
          </a>

          <a
            href={ctaSecondary.href}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-transparent px-7 py-3.5 font-mono text-sm text-white/90 hover:border-white/20"
          >
            {ctaSecondary.label}
          </a>
        </Reveal>
      </div>

      <Reveal
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center font-mono text-[0.7rem] tracking-[0.1em] text-white/40"
        delayMs={340}
      >
        <div className="mx-auto mb-2 h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
        SCROLL
      </Reveal>
    </section>
  );
}
