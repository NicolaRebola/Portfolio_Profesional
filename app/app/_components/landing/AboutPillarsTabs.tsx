type PillarKey = "software" | "dataAI" | "people" | "process";

type Pillar = {
  title: string;
  body: string | string[];
};

const TAB_CONFIG: { key: PillarKey; inputId: string }[] = [
  { key: "software", inputId: "about-pillar-software" },
  { key: "dataAI", inputId: "about-pillar-dataai" },
  { key: "people", inputId: "about-pillar-people" },
  { key: "process", inputId: "about-pillar-process" },
];

function PillarBody({ pillar }: { pillar: Pillar }) {
  return (
    <>
      <h3 className="break-words font-[var(--font-syne)] text-xl font-bold tracking-[-0.02em] text-white/95">
        {pillar.title}
      </h3>
      {Array.isArray(pillar.body) ? (
        <ul className="mt-3 min-w-0 space-y-2 text-sm leading-relaxed text-white/70">
          {pillar.body.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" />
              <span className="min-w-0 break-words">{line}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 break-words text-sm leading-relaxed text-white/70">
          {pillar.body}
        </p>
      )}
    </>
  );
}

const labelClassName =
  "cursor-pointer touch-manipulation select-none min-w-0 max-w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left font-mono text-[0.65rem] leading-snug tracking-[0.06em] text-white/60 transition has-[:checked]:border-white/20 has-[:checked]:bg-white/10 has-[:checked]:text-white sm:text-xs sm:tracking-[0.08em] hover:border-white/15 hover:text-white";

export default function AboutPillarsTabs({
  pillars,
  defaultKey = "software",
}: {
  pillars: Record<PillarKey, Pillar>;
  defaultKey?: PillarKey;
}) {
  return (
    <div className="group/pillars min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 md:p-6">
      <div
        role="radiogroup"
        aria-label="Pillars"
        className="mb-5 flex min-w-0 flex-wrap gap-2"
      >
        {TAB_CONFIG.map(({ key, inputId }) => (
          <label key={key} className={labelClassName}>
            <input
              type="radio"
              name="about-pillars"
              id={inputId}
              defaultChecked={key === defaultKey}
              className="sr-only"
            />
            {pillars[key].title}
          </label>
        ))}
      </div>

      <div
        className="hidden min-h-[8.5rem] min-w-0 group-has-[#about-pillar-software:checked]/pillars:block"
        role="region"
        aria-label={pillars.software.title}
      >
        <PillarBody pillar={pillars.software} />
      </div>
      <div
        className="hidden min-h-[8.5rem] min-w-0 group-has-[#about-pillar-dataai:checked]/pillars:block"
        role="region"
        aria-label={pillars.dataAI.title}
      >
        <PillarBody pillar={pillars.dataAI} />
      </div>
      <div
        className="hidden min-h-[8.5rem] min-w-0 group-has-[#about-pillar-people:checked]/pillars:block"
        role="region"
        aria-label={pillars.people.title}
      >
        <PillarBody pillar={pillars.people} />
      </div>
      <div
        className="hidden min-h-[8.5rem] min-w-0 group-has-[#about-pillar-process:checked]/pillars:block"
        role="region"
        aria-label={pillars.process.title}
      >
        <PillarBody pillar={pillars.process} />
      </div>
    </div>
  );
}
