import type { ExperienceItem } from "@/app/_types/portfolio";
import Reveal from "@/app/_components/Reveal";

function splitPeriod(period: string): { range: string; duration: string } {
  const parts = period.split(/\s*·\s*/);
  if (parts.length < 2) {
    return { range: period.trim(), duration: "" };
  }
  return {
    range: parts[0]?.trim() ?? period,
    duration: parts.slice(1).join(" · ").trim(),
  };
}

export default function Experience({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: Array<
    ExperienceItem & {
      content: { summary: string; bullets: string[] };
    }
  >;
}) {
  return (
    <section id="experience" className="w-full bg-background px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">{title}</p>
          <h2 className="font-[var(--font-syne)] text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            {description}
          </h2>
        </Reveal>

        <div className="space-y-12">
          {items.map((item, i) => {
            const { range, duration } = splitPeriod(item.period);
            return (
              <div key={item.itemId} className="relative border-l-2 border-border pl-8">
                <div
                  aria-hidden
                  className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-accent"
                />

                <Reveal delayMs={i * 110}>
                  <h3 className="mb-3 font-[var(--font-syne)] text-2xl font-bold tracking-[-0.02em] text-foreground">
                    {item.role}
                  </h3>

                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-border bg-peach px-3 py-1 text-sm text-muted">
                      {range}
                    </span>
                    {duration ? (
                      <>
                        <span className="text-accent" aria-hidden>
                          ·
                        </span>
                        <span className="rounded-full border border-success-border bg-success-bg px-3 py-1 text-sm text-success-text">
                          {duration}
                        </span>
                      </>
                    ) : null}
                  </div>

                  <p className="max-w-3xl leading-relaxed text-muted">{item.content.summary}</p>

                  <ul className="mt-4 space-y-3">
                    {item.content.bullets.map((b) => (
                      <li key={b} className="flex gap-3 leading-relaxed text-muted">
                        <span className="mt-1 shrink-0 text-accent" aria-hidden>
                          →
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
