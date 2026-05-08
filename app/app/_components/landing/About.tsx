import type { Stat } from "@/app/_types/portfolio";
import AboutPillarsTabs from "@/app/_components/landing/AboutPillarsTabs";

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
    <section id="about" className="mx-auto w-full min-w-0 max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-10">
        <p className="font-mono text-xs tracking-[0.18em] text-indigo-300/80">
          ABOUT
        </p>
        <h2 className="mt-3 font-[var(--font-syne)] text-3xl font-bold tracking-[-0.02em] text-white/95 md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/60">
          {description}
        </p>
      </div>

      <div className="grid min-w-0 gap-10 md:grid-cols-2 md:gap-16">
        <div className="min-w-0 space-y-5 text-[1.05rem] leading-relaxed text-white/70 break-words">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="min-w-0 md:pt-1">
          <AboutPillarsTabs pillars={pillars} />
        </div>
      </div>

      <div className="mt-12">
        {statsTitle ? (
          <h3 className="mb-4 font-mono text-xs tracking-[0.14em] text-white/50">
            {statsTitle}
          </h3>
        ) : null}

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.id}
              className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div
                className="break-words font-[var(--font-syne)] text-2xl font-extrabold leading-tight text-transparent bg-clip-text sm:text-3xl"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgb(99,102,241), rgb(6,182,212))",
                }}
              >
                {s.value}
              </div>
              <div className="mt-3 break-words font-mono text-xs tracking-[0.08em] text-white/50">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}