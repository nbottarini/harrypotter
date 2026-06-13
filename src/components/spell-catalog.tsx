"use client";

import { Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { SafeImage } from "@/components/safe-image";
import { spellCategories, spells, type Spell } from "@/data/potterpedia";

export function SpellCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Spell["category"] | "Todas">("Todas");

  const filteredSpells = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return spells.filter((spell) => {
      const matchesCategory = category === "Todas" || spell.category === category;
      const haystack = [spell.name, spell.incantation, spell.category, spell.effect, spell.light]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, query]);

  const grouped = spellCategories
    .map((item) => ({
      category: item,
      items: filteredSpells.filter((spell) => spell.category === item),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section className="space-y-7">
      <div className="flex flex-col gap-4 rounded border border-white/10 bg-white/[0.03] p-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden />
          <span className="sr-only">Buscar hechizos</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por hechizo, efecto o luz..."
            className="min-h-11 w-full rounded border border-white/10 bg-black/30 px-10 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#caa44d]/70"
          />
        </label>
        <div className="flex gap-2 overflow-x-auto">
          {["Todas", ...spellCategories].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item as Spell["category"] | "Todas")}
              className={filterClass(category === item)}
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              {item}
            </button>
          ))}
        </div>
      </div>

      {grouped.map((group) => (
        <div key={group.category} className="space-y-4">
          <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-3">
            <h2 className="text-2xl font-black text-white">{group.category}</h2>
            <span className="text-sm text-zinc-500">{group.items.length} hechizos</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((spell) => (
              <article key={spell.id} className="overflow-hidden rounded border border-white/10 bg-[#111111]">
                <div className="relative aspect-[16/9] bg-[#15110a]">
                  <SafeImage src={spell.image} alt={`Imagen de ${spell.name}`} fill className="object-cover opacity-85" />
                </div>
                <div className="space-y-3 p-4">
                  <div>
                    <h3 className="text-lg font-black text-white">{spell.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#caa44d]">{spell.incantation || "Incantacion desconocida"}</p>
                  </div>
                  <p className="text-sm leading-6 text-zinc-400">{spell.effect}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-zinc-300">{spell.category}</span>
                    {spell.light ? (
                      <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-zinc-300">Luz: {spell.light}</span>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
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
