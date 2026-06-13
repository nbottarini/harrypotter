import type { Metadata } from "next";
import { TriviaGame } from "@/components/trivia-game";

export const metadata: Metadata = {
  title: "Trivia | Potterpedia",
  description:
    "Poné a prueba cuánto sabés de Harry Potter: trivias de hechizos, personajes, criaturas o mezclado, contra reloj.",
};

export default function TriviaPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase text-[#caa44d]">Desafío mágico</p>
        <h1 className="text-4xl font-black text-white">Trivia</h1>
        <p className="max-w-3xl text-zinc-400">
          ¿Cuánto sabés del Mundo Mágico? Elegí una categoría, respondé 10 preguntas
          contra reloj y descubrí si sos digno de la Orden de Merlín.
        </p>
      </header>
      <TriviaGame />
    </div>
  );
}
