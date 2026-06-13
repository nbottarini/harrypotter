import { SpellCatalog } from "@/components/spell-catalog";

export default function HechizosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase text-[#caa44d]">Catalogo magico</p>
        <h1 className="text-4xl font-black text-white">Hechizos</h1>
        <p className="max-w-3xl text-zinc-400">
          Hechizos clasificados por defensa, encantamientos, transformacion, maldiciones, curacion, transporte y utilidad.
        </p>
      </header>
      <SpellCatalog />
    </div>
  );
}
