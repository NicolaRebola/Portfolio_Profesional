import type { Stat } from "@/app/_types/portfolio";
import AboutPillarsTabs from "@/app/_components/landing/AboutPillarsTabs";
import Reveal from "@/app/_components/Reveal";

export default function About({
  title,
  description,
  paragraphs,
  stats,
  statsTitle,
  pillars,
}: {
  title: string;
  description: string;
  paragraphs: string[];
  stats: Array<Stat & { label: string }>;
  statsTitle?: string;
  pillars: {
    software: { title: string; body: string | string[] };
    dataAI: { title: string; body: string | string[] };
    people: { title: string; body: string | string[] };
    process: { title: string; body: string | string[] };
  };
}) {
  return (
    <section
      id="about"
      className="mx-auto w-full min-w-0 max-w-6xl border-t border-white/[0.06] px-4 py-16 sm:px-6 sm:py-24"
    >
      <Reveal className="mb-10">
        <p className="font-mono text-xs tracking-[0.18em] text-indigo-300/80">
          ABOUT
        </p>
        <h2 className="mt-3 font-[var(--font-syne)] text-3xl font-bold tracking-[-0.02em] text-white/95 md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/60">
          {description}
        </p>
      </Reveal>

      <div className="grid min-w-0 gap-10 md:grid-cols-2 md:gap-16">
        <div className="min-w-0 space-y-5 text-[1.05rem] leading-relaxed text-white/70 break-words">
          {paragraphs.map((p, i) => (
            <Reveal key={p} delayMs={i * 75}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="min-w-0 md:pt-1" delayMs={120}>
          <AboutPillarsTabs pillars={pillars} />
        </Reveal>
      </div>
    </section>
  );
}
