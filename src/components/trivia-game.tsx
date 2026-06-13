"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Award,
  CheckCircle2,
  RotateCcw,
  Timer,
  Trophy,
  XCircle,
} from "lucide-react";
import {
  PASS_THRESHOLD,
  QUESTIONS_PER_GAME,
  pickQuestions,
  triviaCategories,
  type TriviaCategoryId,
  type TriviaQuestion,
} from "@/data/trivia";

type Phase = "home" | "playing" | "result";

type Difficulty = { id: string; label: string; seconds: number };

const DIFFICULTIES: Difficulty[] = [
  { id: "hard", label: "Difícil", seconds: 5 },
  { id: "normal", label: "Normal", seconds: 10 },
  { id: "relaxed", label: "Relajado", seconds: 15 },
];

const STORAGE_KEY = "potterpedia.trivia.best";

/** Lee los récords guardados por categoría desde localStorage. */
function readBestScores(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

/** Guarda un récord si supera el anterior. Devuelve el mejor vigente. */
function writeBestScore(categoryId: string, score: number): number {
  if (typeof window === "undefined") return score;
  try {
    const scores = readBestScores();
    const best = Math.max(scores[categoryId] ?? 0, score);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...scores, [categoryId]: best }),
    );
    return best;
  } catch {
    return score;
  }
}

function resultCopy(score: number): { title: string; line: string } {
  if (score === QUESTIONS_PER_GAME) {
    return {
      title: "¡Mago de primera clase!",
      line: "Puntaje perfecto. Orden de Merlín, Primera Clase, para vos.",
    };
  }
  if (score >= PASS_THRESHOLD) {
    return {
      title: "¡Aprobado!",
      line: "Digno de Ravenclaw: el Sombrero Seleccionador está impresionado.",
    };
  }
  if (score >= 4) {
    return {
      title: "Casi, casi…",
      line: "Te faltó un repaso en la biblioteca. ¡La próxima lo lográs!",
    };
  }
  return {
    title: "Reprobado",
    line: "Ni Hermione repasó tan poco. ¡A los libros, mago!",
  };
}

export function TriviaGame() {
  const [phase, setPhase] = useState<Phase>("home");
  const [categoryId, setCategoryId] = useState<TriviaCategoryId>("mezclado");
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[1]);
  const [bestScores, setBestScores] = useState<Record<string, number>>({});

  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionStartAt, setQuestionStartAt] = useState(0);

  // Récord recién logrado (para destacarlo en la pantalla de resultado).
  const [finalBest, setFinalBest] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cargar récords del navegador al montar (diferido para no setear estado
  // de forma síncrona dentro del efecto y evitar un mismatch de hidratación).
  useEffect(() => {
    const id = requestAnimationFrame(() => setBestScores(readBestScores()));
    return () => cancelAnimationFrame(id);
  }, []);

  const clearAdvance = useCallback(() => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }, []);

  useEffect(() => clearAdvance, [clearAdvance]);

  const question = questions[current];

  const goToNext = useCallback(() => {
    clearAdvance();
    setSelected(null);
    setLocked(false);
    setTimeLeft(difficulty.seconds);
    setQuestionStartAt(Date.now());
    setCurrent((prev) => prev + 1);
  }, [clearAdvance, difficulty.seconds]);

  // Resolver una respuesta (por click o por timeout). choice = null => se acabó el tiempo.
  const resolveAnswer = useCallback(
    (choice: number | null) => {
      if (locked || !question) return;
      setLocked(true);
      setSelected(choice);
      const correct = choice !== null && choice === question.answer;
      if (correct) {
        setScore((s) => s + 1);
      }
      const isLast = current >= questions.length - 1;
      const finalScore = score + (correct ? 1 : 0);
      advanceTimer.current = setTimeout(() => {
        if (isLast) {
          // Persistir el récord aquí (callback async) en lugar de en un efecto.
          const previous = readBestScores()[categoryId] ?? 0;
          const best = writeBestScore(categoryId, finalScore);
          setFinalBest(best);
          setIsNewRecord(finalScore > previous && finalScore > 0);
          setBestScores(readBestScores());
          setPhase("result");
        } else {
          goToNext();
        }
      }, 1200);
    },
    [categoryId, current, goToNext, locked, question, questions.length, score],
  );

  // Cuenta regresiva por pregunta. Solo actualiza estado dentro del callback
  // del intervalo (no en el cuerpo del efecto).
  useEffect(() => {
    if (phase !== "playing" || locked || !question) return;
    const interval = setInterval(() => {
      const elapsed = (Date.now() - questionStartAt) / 1000;
      const remaining = Math.max(0, difficulty.seconds - elapsed);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        resolveAnswer(null); // timeout = incorrecta
      }
    }, 100);
    return () => clearInterval(interval);
  }, [phase, locked, question, questionStartAt, difficulty.seconds, resolveAnswer]);

  // Soporte de teclado: teclas 1-4 para responder.
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (event: KeyboardEvent) => {
      if (locked || !question) return;
      const index = Number(event.key) - 1;
      if (index >= 0 && index < question.options.length) {
        resolveAnswer(index);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, locked, question, resolveAnswer]);

  function startGame() {
    clearAdvance();
    setQuestions(pickQuestions(categoryId));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setLocked(false);
    setTimeLeft(difficulty.seconds);
    setQuestionStartAt(Date.now());
    setPhase("playing");
  }

  function backToHome() {
    clearAdvance();
    setBestScores(readBestScores());
    setPhase("home");
  }

  const categoryMeta = useMemo(
    () => triviaCategories.find((c) => c.id === categoryId)!,
    [categoryId],
  );

  if (phase === "home") {
    return (
      <Home
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        bestScores={bestScores}
        onStart={startGame}
      />
    );
  }

  if (phase === "result") {
    return (
      <Result
        score={score}
        best={finalBest}
        isNewRecord={isNewRecord}
        categoryLabel={categoryMeta.label}
        onReplay={startGame}
        onHome={backToHome}
      />
    );
  }

  // phase === "playing"
  const total = questions.length;
  const pct = (timeLeft / difficulty.seconds) * 100;
  const urgent = timeLeft <= 3;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-1 font-semibold text-zinc-200">
          {categoryMeta.label}
        </span>
        <span className="text-zinc-400">
          Pregunta <span className="font-bold text-white">{current + 1}</span> / {total}
        </span>
        <span className="font-semibold text-[#caa44d]">Aciertos: {score}</span>
      </div>

      {/* Cuenta regresiva */}
      <div>
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1.5 text-zinc-400">
            <Timer className="h-3.5 w-3.5" aria-hidden /> Tiempo
          </span>
          <span
            className={`font-mono font-bold tabular-nums ${urgent ? "text-red-400" : "text-zinc-300"}`}
            aria-live="off"
          >
            {Math.ceil(timeLeft)}s
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-[width] duration-100 ease-linear ${
              urgent ? "bg-red-500" : "bg-[#caa44d]"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {question ? (
        <div className="rounded border border-white/10 bg-white/[0.03] p-5 sm:p-7">
          <h2 className="text-xl font-black leading-7 text-white sm:text-2xl">
            {question.question}
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {question.options.map((option, index) => {
              const isCorrect = index === question.answer;
              const isChosen = index === selected;

              let cls =
                "border-white/10 bg-white/[0.04] text-zinc-100 hover:border-[#caa44d]/60 hover:bg-[#caa44d]/10";
              if (locked) {
                if (isCorrect) {
                  cls = "border-emerald-500/70 bg-emerald-500/15 text-emerald-100";
                } else if (isChosen) {
                  cls = "border-red-500/70 bg-red-500/15 text-red-100";
                } else {
                  cls = "border-white/10 bg-white/[0.02] text-zinc-500";
                }
              }

              return (
                <button
                  key={index}
                  type="button"
                  disabled={locked}
                  onClick={() => resolveAnswer(index)}
                  className={`flex min-h-12 items-center gap-3 rounded border px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-default ${cls}`}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded border border-white/15 bg-black/30 text-xs font-bold text-zinc-300">
                    {index + 1}
                  </span>
                  <span className="flex-1">{option}</span>
                  {locked && isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" aria-hidden />
                  ) : null}
                  {locked && isChosen && !isCorrect ? (
                    <XCircle className="h-5 w-5 text-red-300" aria-hidden />
                  ) : null}
                </button>
              );
            })}
          </div>

          <p className="mt-4 min-h-5 text-sm font-semibold" aria-live="polite">
            {locked && selected === question.answer ? (
              <span className="text-emerald-300">¡Correcto!</span>
            ) : null}
            {locked && selected !== question.answer && selected !== null ? (
              <span className="text-red-300">Incorrecto.</span>
            ) : null}
            {locked && selected === null ? (
              <span className="text-red-300">¡Se acabó el tiempo!</span>
            ) : null}
          </p>
        </div>
      ) : null}
    </section>
  );
}

function Home({
  categoryId,
  setCategoryId,
  difficulty,
  setDifficulty,
  bestScores,
  onStart,
}: {
  categoryId: TriviaCategoryId;
  setCategoryId: (id: TriviaCategoryId) => void;
  difficulty: Difficulty;
  setDifficulty: (d: Difficulty) => void;
  bestScores: Record<string, number>;
  onStart: () => void;
}) {
  return (
    <section className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {triviaCategories.map((cat) => {
          const Icon = cat.icon;
          const active = cat.id === categoryId;
          const best = bestScores[cat.id];
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryId(cat.id)}
              aria-pressed={active}
              className={`flex flex-col gap-2 rounded border bg-white/[0.03] p-5 text-left transition ${cat.ring} ${
                active
                  ? "border-[#caa44d] bg-[#caa44d]/[0.08] ring-1 ring-[#caa44d]/40"
                  : "border-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${cat.accent}`} aria-hidden />
                  <span className="text-lg font-black text-white">{cat.label}</span>
                </span>
                {typeof best === "number" ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#caa44d]">
                    <Trophy className="h-3.5 w-3.5" aria-hidden />
                    {best}/{QUESTIONS_PER_GAME}
                  </span>
                ) : null}
              </div>
              <p className="text-sm leading-6 text-zinc-400">{cat.description}</p>
            </button>
          );
        })}
      </div>

      <div className="rounded border border-white/10 bg-white/[0.03] p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#caa44d]">
          Dificultad
        </p>
        <p className="mt-1 text-sm text-zinc-400">
          Segundos para responder cada una de las {QUESTIONS_PER_GAME} preguntas.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => {
            const active = d.id === difficulty.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setDifficulty(d)}
                aria-pressed={active}
                className={`min-h-11 rounded border px-4 text-sm font-semibold transition ${
                  active
                    ? "border-[#caa44d] bg-[#caa44d]/15 text-white"
                    : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-[#caa44d]/60"
                }`}
              >
                {d.label} · {d.seconds}s
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex min-h-12 items-center gap-2 rounded border border-[#caa44d]/60 bg-[#caa44d]/15 px-6 text-base font-black text-white transition hover:bg-[#caa44d]/25"
        >
          <Award className="h-5 w-5 text-[#caa44d]" aria-hidden />
          Jugar
        </button>
        <p className="text-sm text-zinc-500">
          Aprobás con {PASS_THRESHOLD} de {QUESTIONS_PER_GAME} respuestas correctas.
        </p>
      </div>
    </section>
  );
}

function Result({
  score,
  best,
  isNewRecord,
  categoryLabel,
  onReplay,
  onHome,
}: {
  score: number;
  best: number;
  isNewRecord: boolean;
  categoryLabel: string;
  onReplay: () => void;
  onHome: () => void;
}) {
  const passed = score >= PASS_THRESHOLD;
  const { title, line } = resultCopy(score);

  return (
    <section className="mx-auto max-w-xl text-center">
      <div
        className={`relative overflow-hidden rounded border p-8 ${
          passed
            ? "border-[#caa44d]/50 bg-[#caa44d]/[0.06] trivia-pop"
            : "border-red-500/40 bg-red-500/[0.05] trivia-shake"
        }`}
      >
        {passed ? <Confetti /> : null}

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
            {categoryLabel}
          </p>
          <div
            className={`mx-auto mt-4 grid h-20 w-20 place-items-center rounded-full border ${
              passed
                ? "border-[#caa44d]/60 bg-[#caa44d]/15"
                : "border-red-500/50 bg-red-500/10"
            }`}
          >
            {passed ? (
              <Trophy className="h-10 w-10 text-[#caa44d]" aria-hidden />
            ) : (
              <XCircle className="h-10 w-10 text-red-400" aria-hidden />
            )}
          </div>

          <p className="mt-5 text-5xl font-black text-white">
            {score}
            <span className="text-2xl text-zinc-500">/{QUESTIONS_PER_GAME}</span>
          </p>

          <h2 className="mt-3 text-2xl font-black text-white">{title}</h2>
          <p className="mt-2 text-zinc-300">{line}</p>

          <p className="mt-4 inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-zinc-300">
            <Trophy className="h-4 w-4 text-[#caa44d]" aria-hidden />
            {isNewRecord ? "¡Nuevo récord!" : "Tu récord:"} {best}/{QUESTIONS_PER_GAME}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex min-h-12 items-center gap-2 rounded border border-[#caa44d]/60 bg-[#caa44d]/15 px-6 font-black text-white transition hover:bg-[#caa44d]/25"
        >
          <RotateCcw className="h-5 w-5 text-[#caa44d]" aria-hidden />
          Jugar de nuevo
        </button>
        <button
          type="button"
          onClick={onHome}
          className="inline-flex min-h-12 items-center gap-2 rounded border border-white/10 bg-white/[0.04] px-6 font-semibold text-zinc-200 transition hover:border-[#caa44d]/60 hover:text-white"
        >
          Elegir otra categoría
        </button>
      </div>
    </section>
  );
}

/** Confetti simple por CSS para la pantalla de victoria. */
function Confetti() {
  const pieces = Array.from({ length: 24 });
  const colors = ["#caa44d", "#f5c45e", "#8bd8b0", "#b7c9ff", "#ffffff"];
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {pieces.map((_, i) => (
        <span
          key={i}
          className="trivia-confetti"
          style={{
            left: `${(i / pieces.length) * 100}%`,
            background: colors[i % colors.length],
            animationDelay: `${(i % 8) * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
