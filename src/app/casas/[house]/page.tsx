import Image from "next/image";
import { notFound } from "next/navigation";
import { CharacterExplorer } from "@/components/character-explorer";
import { getCharactersByHouse, houseById, houses, type HouseId } from "@/data/potterpedia";

export function generateStaticParams() {
  return houses.map((house) => ({ house: house.id }));
}

export default async function HousePage({ params }: PageProps<"/casas/[house]">) {
  const { house: houseParam } = await params;

  if (!isHouseId(houseParam)) {
    notFound();
  }

  const house = houseById[houseParam];
  const houseCharacters = getCharactersByHouse(houseParam);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className={`mb-8 overflow-hidden rounded border ${house.border} bg-gradient-to-br ${house.bg}`}>
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_220px] md:items-center md:p-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase text-zinc-300">{house.founder}</p>
            <h1 className={`text-5xl font-black ${house.accent}`}>{house.name}</h1>
            <div className="flex flex-wrap gap-2">
              {house.traits.map((trait) => (
                <span key={trait} className="rounded border border-white/15 bg-black/20 px-3 py-1 text-sm text-zinc-200">
                  {trait}
                </span>
              ))}
            </div>
            <p className="text-zinc-300">{house.colors}</p>
          </div>
          <div className="relative mx-auto h-44 w-44 md:h-56 md:w-56">
            <Image src={house.crest} alt={`Escudo de ${house.name}`} fill priority className="object-contain" />
          </div>
        </div>
      </section>

      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-[#caa44d]">Personajes de la casa</p>
          <h2 className="mt-2 text-3xl font-black text-white">{house.name}</h2>
        </div>
      </header>
      <CharacterExplorer initialCharacters={houseCharacters} lockedHouse={houseParam} />
    </div>
  );
}

function isHouseId(value: string): value is HouseId {
  return value in houseById;
}
