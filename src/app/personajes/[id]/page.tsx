import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { HouseBadge } from "@/components/house-badge";
import { SafeImage } from "@/components/safe-image";
import { getCharacterById } from "@/data/potterpedia";
import { translateList, translateValue } from "@/lib/translations";

export default async function CharacterDetailPage({ params }: PageProps<"/personajes/[id]">) {
  const { id } = await params;
  const character = getCharacterById(id);

  if (!character) {
    notFound();
  }

  const incantationFields = [
    ["Casa", character.house ? <HouseBadge key="house" house={character.house} /> : "Sin casa de Hogwarts"],
    ["Actor", character.actor],
    ["Especie", translateValue(character.species)],
    ["Familia", translateValue(character.family)],
    ["Profesion", translateValue(character.profession)],
    ["Patronus", translateValue(character.patronus)],
    ["Nacimiento", translateValue(character.birth)],
    ["Estado de sangre", translateValue(character.bloodStatus)],
    ["Genero", translateValue(character.gender)],
    ["Nacionalidad", translateValue(character.nationality)],
    ["Cabello", translateValue(character.hairColor)],
    ["Ojos", translateValue(character.eyeColor)],
    ["Varita", translateValue(character.wand)],
  ] as const;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/personajes" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition hover:text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Volver a personajes
      </Link>

      <section className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="overflow-hidden rounded border border-white/10 bg-[#111111]">
          <div className="relative aspect-[3/4] bg-[#15110a]">
            <SafeImage src={character.image} alt={`Imagen de ${character.name}`} fill priority className="object-cover" />
          </div>
        </div>

        <div className="space-y-8">
          <header className="space-y-4">
            <p className="text-sm font-semibold uppercase text-[#caa44d]">Ficha de personaje</p>
            <div>
              <h1 className="text-5xl font-black text-white">{character.name}</h1>
              {character.summary ? <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">{character.summary}</p> : null}
            </div>
          </header>

          <section className="grid gap-3 sm:grid-cols-2">
            {incantationFields.map(([label, value]) =>
              value ? (
                <div key={label} className="rounded border border-white/10 bg-white/[0.03] p-4">
                  <dt className="text-xs font-semibold uppercase text-zinc-500">{label}</dt>
                  <dd className="mt-2 text-sm text-zinc-200">{value}</dd>
                </div>
              ) : null,
            )}
          </section>

          {character.titles?.length || character.aliases?.length || character.tags.length ? (
            <section className="grid gap-4 md:grid-cols-3">
              <TagBlock title="Titulos" items={translateList(character.titles || [])} />
              <TagBlock title="Alias" items={translateList(character.aliases || [])} />
              <TagBlock title="Vinculos" items={translateList(character.tags)} />
            </section>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function TagBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="rounded border border-white/10 bg-white/[0.03] p-4">
      <h2 className="text-sm font-black uppercase text-zinc-300">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded border border-white/10 bg-black/25 px-2 py-1 text-xs text-zinc-300">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
