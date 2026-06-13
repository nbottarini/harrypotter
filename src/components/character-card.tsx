import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Character } from "@/data/potterpedia";
import { SafeImage } from "@/components/safe-image";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <Link
      href={`/personajes/${character.id}`}
      className="group overflow-hidden rounded border border-white/10 bg-[#111111]/90 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-[#caa44d]/50"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#15110a]">
        <SafeImage src={character.image} alt={`Imagen de ${character.name}`} fill className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex min-h-24 items-start justify-between gap-3 p-3">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-base font-black text-white">{character.name}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-zinc-400">{character.actor || "Sin actor registrado"}</p>
        </div>
        <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded border border-white/10 bg-white/[0.04] text-[#caa44d] transition group-hover:bg-[#caa44d]/15">
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
