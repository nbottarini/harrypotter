"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { SafeImage } from "@/components/safe-image";
import { creatures, type Creature } from "@/data/potterpedia";

const origins: Array<Creature["origin"] | "Todas"> = ["Todas", "Harry Potter", "Fantastic Beasts", "Ambos"];

export function CreatureCatalog() {
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState<Creature["origin"] | "Todas">("Todas");

  const filteredCreatures = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return creatures.filter((creature) => {
      const matchesOrigin = origin === "Todas" || creature.origin === origin;
      const haystack = [creature.name, creature.type, creature.origin, creature.description, creature.traits.join(" ")]
        .join(" ")
        .toLowerCase();

      return matchesOrigin && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [origin, query]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded border border-white/10 bg-white/[0.03] p-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden />
          <span className="sr-only">Buscar criaturas</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por criatura, tipo o rasgo..."
            className="min-h-11 w-full rounded border border-white/10 bg-black/30 px-10 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#caa44d]/70"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto">
          {origins.map((item) => (
            <button type="button" key={item} onClick={() => setOrigin(item)} className={filterClass(origin === item)}>
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCreatures.map((creature) => (
          <article key={creature.id} className="overflow-hidden rounded border border-white/10 bg-[#111111] shadow-2xl shadow-black/20">
            <div className="relative aspect-[4/3] bg-[#15110a]">
              <SafeImage src={creature.image} alt={`Imagen de ${creature.name}`} fill className="object-cover" />
              <div className="absolute left-3 top-3 rounded border border-black/20 bg-black/70 px-2 py-1 text-xs font-semibold text-[#f1c96b]">
                {creature.origin}
              </div>
            </div>
            <div className="space-y-4 p-4">
              <div>
                <p className="text-sm font-semibold text-[#caa44d]">{creature.type}</p>
                <h3 className="mt-1 text-xl font-black text-white">{creature.name}</h3>
              </div>
              <p className="text-sm leading-6 text-zinc-400">{creature.description}</p>
              <div className="flex flex-wrap gap-2">
                {creature.traits.map((trait) => (
                  <span key={trait} className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-zinc-300">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function filterClass(active: boolean) {
  return `inline-flex min-h-10 shrink-0 items-center gap-2 rounded border px-3 text-sm font-semibold transition ${
    active
      ? "border-[#caa44d]/70 bg-[#caa44d]/15 text-white"
      : "border-white/10 bg-black/25 text-zinc-300 hover:border-[#caa44d]/50"
  }`;
}
