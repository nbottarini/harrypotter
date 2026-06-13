import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCharactersByHouse, type House } from "@/data/potterpedia";

export function HouseTile({ house, priority }: { house: House; priority?: boolean }) {
  const count = getCharactersByHouse(house.id).length;

  return (
    <Link
      href={`/casas/${house.id}`}
      className={`group relative min-h-72 overflow-hidden rounded border ${house.border} bg-gradient-to-br ${house.bg} p-6 shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:shadow-black`}
    >
      <div className="absolute right-4 top-4 h-28 w-28 opacity-30 transition group-hover:opacity-70">
        <Image src={house.crest} alt={`Escudo de ${house.name}`} fill priority={priority} className="object-contain" />
      </div>
      <div className="relative flex h-full flex-col justify-between gap-10">
        <div>
          <p className="text-sm font-semibold uppercase text-zinc-300">{house.founder}</p>
          <h2 className={`mt-2 text-3xl font-black ${house.accent}`}>{house.name}</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-300">{house.traits.join(" / ")}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-zinc-300">{count} personajes del MVP</span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/15 bg-white/[0.06] text-white transition group-hover:border-[#caa44d]/60 group-hover:bg-[#caa44d]/15">
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
