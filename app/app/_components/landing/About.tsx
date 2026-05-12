import type { PillarKey } from "@/app/_components/landing/AboutPillarsTabs";
import AboutPillarsTabs from "@/app/_components/landing/AboutPillarsTabs";
import Reveal from "@/app/_components/Reveal";

export default function About({
  eyebrow,
  headline,
  description,
  paragraphs,
  pillars,
}: {
  eyebrow: string;
  headline: string;
  description: string;
  paragraphs: string[];
  pillars: Record<
    PillarKey,
    {
      title: string;
      body: string | string[];
    }
  >;
}) {
  return (
    <section
      id="about"
      className="w-full bg-card px-6 py-24 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
            {eyebrow}
          </p>
          <h2 className="font-[var(--font-syne)] text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            {headline}
          </h2>
        </Reveal>

        <div className="mb-12 max-w-4xl space-y-6">
          <Reveal delayMs={40}>
            <p className="text-xl leading-relaxed text-muted">{description}</p>
          </Reveal>
          {paragraphs.map((p, i) => (
            <Reveal key={p} delayMs={80 + i * 60}>
              <p className="text-xl leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={140}>
          <AboutPillarsTabs pillars={pillars} />
        </Reveal>
      </div>
    </section>
  );
}
