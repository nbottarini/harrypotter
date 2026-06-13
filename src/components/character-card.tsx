import { BadgeCheck, BriefcaseBusiness, UserRound } from "lucide-react";
import { type Character } from "@/data/potterpedia";
import { HouseBadge } from "@/components/house-badge";
import { SafeImage } from "@/components/safe-image";

export function CharacterCard({ character }: { character: Character }) {
  return (
    <article className="group overflow-hidden rounded border border-white/10 bg-[#111111]/90 shadow-2xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-[#caa44d]/50">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#15110a]">
        <SafeImage
          src={character.image}
          alt={`Imagen de ${character.name}`}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <HouseBadge house={character.house} />
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <h3 className="text-xl font-black text-white">{character.name}</h3>
          {character.actor ? <p className="mt-1 text-sm text-zinc-400">{character.actor}</p> : null}
        </div>
        <dl className="space-y-3 text-sm">
          <div className="flex gap-3">
            <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-[#caa44d]" aria-hidden />
            <div>
              <dt className="font-semibold text-zinc-200">Familia</dt>
              <dd className="text-zinc-400">{character.family || "No especificada"}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0 text-[#caa44d]" aria-hidden />
            <div>
              <dt className="font-semibold text-zinc-200">Profesion</dt>
              <dd className="text-zinc-400">{character.profession || "No especificada"}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#caa44d]" aria-hidden />
            <div>
              <dt className="font-semibold text-zinc-200">Especie</dt>
              <dd className="text-zinc-400">{character.species}</dd>
            </div>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2">
          {character.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-zinc-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
