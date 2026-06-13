import { CreatureCatalog } from "@/components/creature-catalog";

export default function CriaturasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase text-[#caa44d]">Bestiario</p>
        <h1 className="text-4xl font-black text-white">Criaturas</h1>
        <p className="max-w-3xl text-zinc-400">
          Criaturas de Harry Potter y Fantastic Beasts con imagen, tipo, rasgos y descripcion breve.
        </p>
      </header>
      <CreatureCatalog />
    </div>
  );
}
