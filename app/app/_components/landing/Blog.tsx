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
    <section id="blog" className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="mb-10">
        <p className="font-mono text-xs tracking-[0.18em] text-indigo-300/80">
          BLOG
        </p>
        <h2 className="mt-3 font-[var(--font-syne)] text-3xl font-bold tracking-[-0.02em] text-white/95 md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-white/60">
          {description}
        </p>
      </div>

      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10"
      >
        <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 font-mono text-xs text-cyan-300">
          {comingSoon}
        </span>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
          {banner}
        </p>
      </div>
    </section>
  );
}
