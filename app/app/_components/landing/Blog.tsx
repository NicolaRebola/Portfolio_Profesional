import Reveal from "@/app/_components/Reveal";

export default function Blog({
  title,
  description,
  comingSoon,
  banner,
}: {
  title: string;
  description: string;
  comingSoon: string;
  banner: string;
}) {
  return (
    <section id="blog" className="w-full bg-background px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">{title}</p>
          <h2 className="font-[var(--font-syne)] text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            {description}
          </h2>
        </Reveal>

        <Reveal delayMs={100}>
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-border bg-card p-10 md:p-12"
          >
            <span className="mb-6 inline-block rounded-full bg-peach px-4 py-2 text-sm font-medium text-accent">
              {comingSoon}
            </span>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">{banner}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
