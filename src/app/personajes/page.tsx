import { CharacterExplorer } from "@/components/character-explorer";

export default function PersonajesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase text-[#caa44d]">Archivo de personajes</p>
        <h1 className="text-4xl font-black text-white">Personajes</h1>
        <p className="max-w-3xl text-zinc-400">
          Personajes principales y secundarios con acceso a una ficha completa de cada uno.
        </p>
      </header>
      <CharacterExplorer />
    </div>
  );
}
