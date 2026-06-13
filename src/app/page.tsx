import { HouseTile } from "@/components/house-tile";
import { houses } from "@/data/potterpedia";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="py-8">
        <div className="space-y-4">
          <h1 className="max-w-3xl text-5xl font-black leading-tight text-white sm:text-6xl">Potterpedia</h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-300">
            Una wiki oscura del Mundo Magico de Harry Potter con personajes, casas, hechizos y criaturas.
          </p>
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
