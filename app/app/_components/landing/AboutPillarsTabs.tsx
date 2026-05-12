import { Building2, Code2, Database, Users } from "lucide-react";

export type PillarKey = "software" | "dataAI" | "people" | "process";

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

const PILLAR_ICONS: Record<PillarKey, typeof Code2> = {
  software: Code2,
  dataAI: Database,
  people: Users,
  process: Building2,
};

function PillarBody({ pillar }: { pillar: Pillar }) {
  return (
    <>
      <h3 className="break-words font-[var(--font-syne)] text-xl font-bold tracking-[-0.02em] text-foreground">
        {pillar.title}
      </h3>
      {Array.isArray(pillar.body) ? (
        <ul className="mt-4 min-w-0 space-y-4">
          {pillar.body.map((line) => (
            <li key={line} className="flex gap-4">
              <span className="mt-1 shrink-0 text-accent" aria-hidden>
                →
              </span>
              <span className="min-w-0 break-words text-lg leading-relaxed text-muted">{line}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 break-words text-lg leading-relaxed text-muted">{pillar.body}</p>
      )}
    </>
  );
}

const triggerBase =
  "group flex cursor-pointer touch-manipulation select-none items-center gap-2 rounded-xl border-2 border-border px-6 py-3 text-muted transition-all hover:border-accent hover:text-accent has-[:checked]:border-accent has-[:checked]:bg-accent has-[:checked]:text-white";

export default function AboutPillarsTabs({
  pillars,
  defaultKey = "software",
}: {
  pillars: Record<PillarKey, Pillar>;
  defaultKey?: PillarKey;
}) {
  return (
    <div className="group/pillars min-w-0 w-full">
      <div
        role="radiogroup"
        aria-label="Pillars"
        className="mb-8 flex min-w-0 flex-wrap gap-3 border-b border-border pb-4"
      >
        {TAB_CONFIG.map(({ key, inputId }) => {
          const Icon = PILLAR_ICONS[key];
          return (
            <label key={key} className={triggerBase}>
              <input
                type="radio"
                name="about-pillars"
                id={inputId}
                defaultChecked={key === defaultKey}
                className="sr-only"
              />
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              <span className="font-medium">{pillars[key].title}</span>
            </label>
          );
        })}
      </div>

      <div
        className="hidden min-h-[8.5rem] min-w-0 rounded-2xl border border-border bg-gradient-to-br from-surface to-peach p-8 group-has-[#about-pillar-software:checked]/pillars:block"
        role="region"
        aria-label={pillars.software.title}
      >
        <PillarBody pillar={pillars.software} />
      </div>
      <div
        className="hidden min-h-[8.5rem] min-w-0 rounded-2xl border border-border bg-gradient-to-br from-surface to-peach p-8 group-has-[#about-pillar-dataai:checked]/pillars:block"
        role="region"
        aria-label={pillars.dataAI.title}
      >
        <PillarBody pillar={pillars.dataAI} />
      </div>
      <div
        className="hidden min-h-[8.5rem] min-w-0 rounded-2xl border border-border bg-gradient-to-br from-surface to-peach p-8 group-has-[#about-pillar-people:checked]/pillars:block"
        role="region"
        aria-label={pillars.people.title}
      >
        <PillarBody pillar={pillars.people} />
      </div>
      <div
        className="hidden min-h-[8.5rem] min-w-0 rounded-2xl border border-border bg-gradient-to-br from-surface to-peach p-8 group-has-[#about-pillar-process:checked]/pillars:block"
        role="region"
        aria-label={pillars.process.title}
      >
        <PillarBody pillar={pillars.process} />
      </div>
    </div>
  );
}
