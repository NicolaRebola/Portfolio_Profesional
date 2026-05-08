import type { ReactNode } from "react";

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
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 font-mono text-xs tracking-wide text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          {tag}
        </div>

        <h1 className="font-[var(--font-syne)] text-[clamp(2.8rem,6vw,5.5rem)] font-extrabold leading-[1] tracking-[-0.03em]">
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
        </h1>

        <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/60">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
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
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center font-mono text-[0.7rem] tracking-[0.1em] text-white/40">
        <div className="mx-auto mb-2 h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
        SCROLL
      </div>
    </section>
  );
}