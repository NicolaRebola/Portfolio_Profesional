"use client";

import { ButtonGroup } from "@/components/tailgrids/core/button-group";
import { useMemo, useState } from "react";

type PillarKey = "software" | "dataAI" | "people" | "process";

type Pillar = {
  title: string;
  body: string | string[];
};

export default function AboutPillarsTabs({
  pillars,
  defaultKey = "software",
}: {
  pillars: Record<PillarKey, Pillar>;
  defaultKey?: PillarKey;
}) {
  const keys = useMemo<PillarKey[]>(
    () => ["software", "dataAI", "people", "process"],
    []
  );

  const [active, setActive] = useState<PillarKey>(defaultKey);
  const activePillar = pillars[active];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
      <div role="tablist" aria-label="Pillars" className="mb-5">
        <ButtonGroup variant="secondary" size="sm">
          {keys.map((k) => {
            const isActive = k === active;
            return (
              <button
                key={k}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActive(k)}
                className={[
                  "px-3.5 py-2.5 font-mono text-xs tracking-[0.08em] transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white",
                ].join(" ")}
              >
                {pillars[k].title}
              </button>
            );
          })}
        </ButtonGroup>
      </div>

      <div role="tabpanel" className="min-h-[8.5rem]">
        <h3 className="font-[var(--font-syne)] text-xl font-bold tracking-[-0.02em] text-white/95">
          {activePillar.title}
        </h3>
        {Array.isArray(activePillar.body) ? (
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70">
            {activePillar.body.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {activePillar.body}
          </p>
        )}
      </div>
    </div>
  );
}

