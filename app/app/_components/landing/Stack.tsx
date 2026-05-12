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
    <section id="stack" className="w-full bg-card px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">{title}</p>
          <h2 className="font-[var(--font-syne)] text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            {description}
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((group, i) => (
            <Reveal key={group.id} className="h-full" delayMs={i * 95}>
              <div className="h-full rounded-2xl border-2 border-border bg-surface p-6 transition-all hover:border-accent">
                <h3 className="font-[var(--font-syne)] text-xl font-bold tracking-[-0.01em] text-foreground">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((t) => (
                    <span
                      key={t.id}
                      className="inline-flex rounded-full border border-peach-border bg-peach px-3 py-1.5 text-sm text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
