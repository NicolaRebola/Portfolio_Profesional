import type { StackGroup } from "@/app/_types/portfolio";
import Reveal from "@/app/_components/Reveal";

export default function Stack({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: StackGroup[];
}) {
  return (
    <section
      id="stack"
      className="mx-auto w-full max-w-6xl border-t border-white/[0.06] px-6 py-24"
    >
      <Reveal className="mb-10">
        <p className="font-mono text-xs tracking-[0.18em] text-indigo-300/80">
          STACK
        </p>
        <h2 className="mt-3 font-[var(--font-syne)] text-3xl font-bold tracking-[-0.02em] text-white/95 md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/60">
          {description}
        </p>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((group, i) => (
          <Reveal key={group.id} className="h-full" delayMs={i * 95}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-indigo-400/40 hover:-translate-y-0.5">
              <h3 className="font-[var(--font-syne)] text-xl font-bold tracking-[-0.01em] text-white/95">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((t) => (
                  <span
                    key={t.id}
                    className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-left font-mono text-xs leading-snug text-cyan-300"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
