"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { spellCategories, spells } from "@/data/potterpedia";
import { translateSpellEffect, translateValue } from "@/lib/translations";

export function SpellCatalog() {
  const [query, setQuery] = useState("");

  const filteredSpells = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return spells.filter((spell) => {
      const translatedEffect = translateSpellEffect(spell.effect);
      const translatedLight = translateValue(spell.light);
      const haystack = [spell.name, spell.incantation, spell.category, spell.effect, translatedEffect, spell.light, translatedLight]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return !normalizedQuery || haystack.includes(normalizedQuery);
    });
  }, [query]);

  const grouped = spellCategories
    .map((item) => ({
      category: item,
      items: filteredSpells.filter((spell) => spell.category === item),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section className="space-y-7">
      <div className="rounded border border-white/10 bg-white/[0.03] p-4">
        <label className="relative block w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden />
          <span className="sr-only">Buscar hechizos</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por hechizo, efecto o luz..."
            className="min-h-11 w-full rounded border border-white/10 bg-black/30 px-10 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#caa44d]/70"
          />
        </label>
      </div>

      {grouped.length > 0 ? (
        grouped.map((group) => (
          <div key={group.category} className="space-y-4">
            <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-3">
              <h2 className="text-2xl font-black text-white">{group.category}</h2>
              <span className="text-sm text-zinc-500">{group.items.length} hechizos</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((spell) => (
                <article key={spell.id} className="overflow-hidden rounded border border-white/10 bg-[#111111]">
                  <div className="relative aspect-[16/9] bg-[#15110a]">
                    <Image src="/assets/spell-wand.svg" alt="" fill className="object-cover" />
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <h3 className="text-lg font-black text-white">{spell.name}</h3>
                      {spell.incantation && spell.incantation.toLowerCase() !== spell.name.toLowerCase() ? (
                        <p className="mt-1 text-sm font-semibold text-[#caa44d]">{spell.incantation}</p>
                      ) : null}
                    </div>
                    <p className="text-sm leading-6 text-zinc-400">{translateSpellEffect(spell.effect)}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-zinc-300">{spell.category}</span>
                      {spell.light ? (
                        <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-zinc-300">Luz: {translateValue(spell.light)}</span>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="rounded border border-white/10 bg-white/[0.03] px-5 py-10 text-center">
          <p className="text-lg font-black text-white">No se encontraron hechizos</p>
          <p className="mt-2 text-sm text-zinc-400">
            {query.trim() ? `No hay resultados para "${query.trim()}".` : "No hay hechizos para mostrar."}
          </p>
        </div>
      )}
    </section>
  );
}
