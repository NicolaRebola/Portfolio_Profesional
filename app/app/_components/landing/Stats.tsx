import type { Stat } from "@/app/_types/portfolio";

export default function Stats({
  title,
  description,
  items,
  labels,
}: {
  title: string;
  description: string;
  items: Stat[];
  labels: Record<Stat["id"], string>;
}) {
  return (
    <section id="stats" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-10">
        <p className="font-mono text-xs tracking-[0.18em] text-indigo-300/80">
          STATS
        </p>
        <h2 className="mt-3 font-[var(--font-syne)] text-3xl font-bold tracking-[-0.02em] text-white/95 md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/60">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <div className="font-[var(--font-syne)] text-2xl font-extrabold leading-none text-white/95">
              {s.value}
            </div>
            <div className="mt-3 font-mono text-xs tracking-[0.08em] text-white/50">
              {labels[s.id]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}