"use client";

import { Search, Shield } from "lucide-react";
import { useMemo, useState } from "react";
import { CharacterCard } from "@/components/character-card";
import { characters, houses, type Character, type HouseId } from "@/data/potterpedia";

type CharacterExplorerProps = {
  initialCharacters?: Character[];
  lockedHouse?: HouseId;
};

export function CharacterExplorer({ initialCharacters = characters, lockedHouse }: CharacterExplorerProps) {
  const [query, setQuery] = useState("");
  const [house, setHouse] = useState<HouseId | "todas">(lockedHouse ?? "todas");

  const filteredCharacters = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return initialCharacters.filter((character) => {
      const matchesHouse = house === "todas" || character.house === house;
      const haystack = [
        character.name,
        character.family,
        character.profession,
        character.species,
        character.actor,
        character.tags.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesHouse && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [house, initialCharacters, query]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">
        <label className="relative block w-full md:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden />
          <span className="sr-only">Buscar personajes</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre, familia, profesion..."
            className="min-h-11 w-full rounded border border-white/10 bg-black/30 px-10 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#caa44d]/70"
          />
        </label>

        {!lockedHouse ? (
          <div className="flex gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setHouse("todas")}
              className={filterClass(house === "todas")}
            >
              <Shield className="h-4 w-4" aria-hidden />
              Todas
            </button>
            {houses.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setHouse(item.id)}
                className={filterClass(house === item.id)}
              >
                <Shield className="h-4 w-4" aria-hidden />
                {item.name}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between text-sm text-zinc-400">
        <span>{filteredCharacters.length} personajes</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
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
