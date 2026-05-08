import type { ExperienceItem } from "@/app/_types/portfolio";

export default function Experience(
  {
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
  }
) {
  return (
    <section id="experience" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-10">
        <p className="font-mono text-xs tracking-[0.18em] text-indigo-300/80">
          EXPERIENCE
        </p>
        <h2 className="mt-3 font-[var(--font-syne)] text-3xl font-bold tracking-[-0.02em] text-white/95 md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/60">
          {description}
        </p>
      </div>

      <ol className="relative">
        {/* rail */}
        <div
          aria-hidden="true"
          className="absolute left-4 top-2 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-indigo-400 via-cyan-400 to-transparent"
        />

        {items.map((item) => (
          <li key={item.itemId} className="grid grid-cols-[2rem_1fr] gap-x-4 pb-12">
            {/* dot column */}
            <div className="flex justify-center">
              <div
                aria-hidden="true"
                className="mt-[0.45rem] h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_0_3px_rgba(0,0,0,1),0_0_0_4px_rgba(99,102,241,0.35)]"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 pt-5">
                <h3 className="font-[var(--font-syne)] text-xl font-bold tracking-[-0.02em] text-white/95">
                  {item.role}
                </h3>

                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 font-mono text-xs text-cyan-300">
                  {item.period}
                </span>
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/65">
                {item.content.summary}
              </p>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/70">
                {item.content.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300/80" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}