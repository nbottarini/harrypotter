import Link from "next/link";
import { BookOpen, ScrollText, Sparkles } from "lucide-react";
import { HouseTile } from "@/components/house-tile";
import { characters, creatures, houses, spells } from "@/data/potterpedia";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="space-y-6">
          <div className="inline-flex rounded border border-[#caa44d]/30 bg-[#caa44d]/10 px-3 py-1 text-sm font-semibold text-[#f1c96b]">
            Hogwarts, hechizos y criaturas
          </div>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-black leading-tight text-white sm:text-6xl">Potterpedia</h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-300">
              Una wiki oscura del mundo magico con personajes principales, casas, hechizos y criaturas de Harry Potter y Fantastic Beasts.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Link href="/personajes" className="rounded border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#caa44d]/50">
            <BookOpen className="h-5 w-5 text-[#caa44d]" aria-hidden />
            <p className="mt-4 text-2xl font-black text-white">{characters.length}</p>
            <p className="mt-1 text-sm text-zinc-400">Personajes</p>
          </Link>
          <Link href="/hechizos" className="rounded border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#caa44d]/50">
            <Sparkles className="h-5 w-5 text-[#caa44d]" aria-hidden />
            <p className="mt-4 text-2xl font-black text-white">{spells.length}</p>
            <p className="mt-1 text-sm text-zinc-400">Hechizos</p>
          </Link>
          <Link href="/criaturas" className="rounded border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#caa44d]/50">
            <ScrollText className="h-5 w-5 text-[#caa44d]" aria-hidden />
            <p className="mt-4 text-2xl font-black text-white">{creatures.length}</p>
            <p className="mt-1 text-sm text-zinc-400">Criaturas</p>
          </Link>
        </div>
      </section>

      <section className="py-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase text-[#caa44d]">Casas de Hogwarts</p>
            <h2 className="mt-2 text-3xl font-black text-white">Elige una casa</h2>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {houses.map((house, index) => (
            <HouseTile key={house.id} house={house} priority={index === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}
