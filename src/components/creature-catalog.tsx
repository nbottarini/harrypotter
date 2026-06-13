"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SafeImage } from "@/components/safe-image";
import { creatures } from "@/data/potterpedia";
import { translateValue } from "@/lib/translations";

export function CreatureCatalog() {
  const [query, setQuery] = useState("");

  const filteredCreatures = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return creatures.filter((creature) => {
      const haystack = [creature.name, creature.type, creature.description, creature.traits.join(" "), translateValue(creature.type)]
        .join(" ")
        .toLowerCase();

      return !normalizedQuery || haystack.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <section className="space-y-6">
      <div className="rounded border border-white/10 bg-white/[0.03] p-4">
        <label className="relative block w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden />
          <span className="sr-only">Buscar criaturas</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por criatura, tipo o rasgo..."
            className="min-h-11 w-full rounded border border-white/10 bg-black/30 px-10 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#caa44d]/70"
          />
        </label>
      </div>

      {filteredCreatures.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCreatures.map((creature) => (
            <article key={creature.id} className="overflow-hidden rounded border border-white/10 bg-[#111111] shadow-2xl shadow-black/20">
              <div className="relative aspect-[4/3] bg-[#15110a]">
                <SafeImage src={creature.image} alt={`Imagen de ${creature.name}`} fill className="object-cover" />
              </div>
              <div className="space-y-4 p-4">
                <div>
                  {creature.type.toLowerCase() !== creature.name.toLowerCase() ? (
                    <p className="text-sm font-semibold text-[#caa44d]">{translateValue(creature.type)}</p>
                  ) : null}
                  <h3 className={creature.type.toLowerCase() !== creature.name.toLowerCase() ? "mt-1 text-xl font-black text-white" : "text-xl font-black text-white"}>
                    {creature.name}
                  </h3>
                </div>
                <p className="text-sm leading-6 text-zinc-400">{creature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {creature.traits.map((trait) => (
                    <span key={trait} className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-zinc-300">
                    {translateValue(trait)}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded border border-white/10 bg-white/[0.03] px-5 py-10 text-center">
          <p className="text-lg font-black text-white">No se encontraron criaturas</p>
          <p className="mt-2 text-sm text-zinc-400">
            {query.trim() ? `No hay resultados para "${query.trim()}".` : "No hay criaturas para mostrar."}
          </p>
        </div>
      )}
    </section>
  );
}
