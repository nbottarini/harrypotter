import { Cat, ScrollText, Shuffle, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TriviaCategory = "hechizos" | "personajes" | "criaturas";
export type TriviaCategoryId = TriviaCategory | "mezclado";

export type TriviaQuestion = {
  id: string;
  category: TriviaCategory;
  question: string;
  options: string[]; // 4 opciones
  answer: number; // indice 0-3 de la correcta
};

export type TriviaCategoryMeta = {
  id: TriviaCategoryId;
  label: string;
  description: string;
  icon: LucideIcon;
  accent: string; // color de texto del acento
  ring: string; // color de borde al hacer hover/seleccionar
};

export const QUESTIONS_PER_GAME = 10;
export const PASS_THRESHOLD = 7;

export const triviaCategories: TriviaCategoryMeta[] = [
  {
    id: "hechizos",
    label: "Hechizos",
    description: "Encantamientos, maldiciones y conjuros del mundo mágico.",
    icon: Sparkles,
    accent: "text-[#b7c9ff]",
    ring: "hover:border-[#254d91]/70",
  },
  {
    id: "personajes",
    label: "Personajes",
    description: "Magos, brujas y muggles que pueblan la saga.",
    icon: ScrollText,
    accent: "text-[#f5c45e]",
    ring: "hover:border-[#8f1d22]/70",
  },
  {
    id: "criaturas",
    label: "Criaturas",
    description: "Bestias mágicas, seres y monstruos del bestiario.",
    icon: Cat,
    accent: "text-[#8bd8b0]",
    ring: "hover:border-[#1b6b4b]/70",
  },
  {
    id: "mezclado",
    label: "Mezclado",
    description: "Un poco de todo: la prueba definitiva para todo fan.",
    icon: Shuffle,
    accent: "text-[#caa44d]",
    ring: "hover:border-[#caa44d]/70",
  },
];

const spellQuestions: TriviaQuestion[] = [
  {
    id: "sp-lumos",
    category: "hechizos",
    question: "¿Qué hechizo enciende una luz en la punta de la varita?",
    options: ["Lumos", "Nox", "Incendio", "Expulso"],
    answer: 0,
  },
  {
    id: "sp-nox",
    category: "hechizos",
    question: "¿Cuál es el contrahechizo que apaga la luz de la varita?",
    options: ["Finite", "Nox", "Lumos Máxima", "Aparecium"],
    answer: 1,
  },
  {
    id: "sp-expelliarmus",
    category: "hechizos",
    question: "¿Qué hace el encantamiento Expelliarmus?",
    options: [
      "Desarma al oponente",
      "Provoca cosquillas",
      "Levita objetos",
      "Crea un escudo",
    ],
    answer: 0,
  },
  {
    id: "sp-wingardium",
    category: "hechizos",
    question: "¿Para qué sirve 'Wingardium Leviosa'?",
    options: [
      "Para hacer levitar objetos",
      "Para curar heridas",
      "Para abrir cerraduras",
      "Para conjurar fuego",
    ],
    answer: 0,
  },
  {
    id: "sp-avada",
    category: "hechizos",
    question: "¿Cuál de estas es la Maldición Asesina?",
    options: ["Crucio", "Imperio", "Avada Kedavra", "Sectumsempra"],
    answer: 2,
  },
  {
    id: "sp-crucio",
    category: "hechizos",
    question: "¿Qué Maldición Imperdonable causa un dolor insoportable?",
    options: ["Imperio", "Crucio", "Avada Kedavra", "Confundo"],
    answer: 1,
  },
  {
    id: "sp-imperio",
    category: "hechizos",
    question: "¿Qué Maldición Imperdonable controla la voluntad de la víctima?",
    options: ["Crucio", "Avada Kedavra", "Imperio", "Legeremens"],
    answer: 2,
  },
  {
    id: "sp-expecto",
    category: "hechizos",
    question: "¿Qué hechizo conjura un Patronus para repeler dementores?",
    options: [
      "Expecto Patronum",
      "Protego",
      "Riddikulus",
      "Patronus Totalus",
    ],
    answer: 0,
  },
  {
    id: "sp-alohomora",
    category: "hechizos",
    question: "¿Qué hechizo abre puertas y cerraduras?",
    options: ["Alohomora", "Colloportus", "Reparo", "Aberto"],
    answer: 0,
  },
  {
    id: "sp-accio",
    category: "hechizos",
    question: "¿Qué hace el encantamiento convocador 'Accio'?",
    options: [
      "Atrae un objeto hacia el lanzador",
      "Repele un objeto",
      "Hace desaparecer un objeto",
      "Duplica un objeto",
    ],
    answer: 0,
  },
  {
    id: "sp-riddikulus",
    category: "hechizos",
    question: "¿Qué hechizo se usa contra un boggart?",
    options: ["Riddikulus", "Obliviate", "Expelliarmus", "Reducto"],
    answer: 0,
  },
  {
    id: "sp-protego",
    category: "hechizos",
    question: "¿Qué encantamiento crea un escudo protector?",
    options: ["Protego", "Impedimenta", "Petrificus", "Salvio Hexia"],
    answer: 0,
  },
  {
    id: "sp-petrificus",
    category: "hechizos",
    question: "¿Qué hace 'Petrificus Totalus'?",
    options: [
      "Paraliza por completo el cuerpo",
      "Provoca el sueño",
      "Borra la memoria",
      "Hace cosquillas",
    ],
    answer: 0,
  },
  {
    id: "sp-obliviate",
    category: "hechizos",
    question: "¿Qué hechizo borra recuerdos?",
    options: ["Obliviate", "Confundo", "Legeremens", "Stupefy"],
    answer: 0,
  },
  {
    id: "sp-stupefy",
    category: "hechizos",
    question: "¿Qué efecto tiene el hechizo aturdidor 'Stupefy'?",
    options: [
      "Deja inconsciente al objetivo",
      "Lo hace levitar",
      "Lo desarma",
      "Lo cura",
    ],
    answer: 0,
  },
  {
    id: "sp-incendio",
    category: "hechizos",
    question: "¿Qué hechizo produce fuego?",
    options: ["Incendio", "Aguamenti", "Glacius", "Ventus"],
    answer: 0,
  },
  {
    id: "sp-aguamenti",
    category: "hechizos",
    question: "¿Qué conjura el hechizo 'Aguamenti'?",
    options: ["Un chorro de agua", "Una llama", "Viento", "Hielo"],
    answer: 0,
  },
  {
    id: "sp-sectumsempra",
    category: "hechizos",
    question: "¿Quién inventó el hechizo 'Sectumsempra'?",
    options: [
      "Severus Snape (el Príncipe Mestizo)",
      "Albus Dumbledore",
      "Gilderoy Lockhart",
      "Lord Voldemort",
    ],
    answer: 0,
  },
];

const characterQuestions: TriviaQuestion[] = [
  {
    id: "ch-patronus-harry",
    category: "personajes",
    question: "¿Qué forma tiene el Patronus de Harry Potter?",
    options: ["Un ciervo", "Una nutria", "Un perro", "Una liebre"],
    answer: 0,
  },
  {
    id: "ch-patronus-hermione",
    category: "personajes",
    question: "¿Qué forma tiene el Patronus de Hermione Granger?",
    options: ["Una nutria", "Un ciervo", "Un gato", "Un caballo"],
    answer: 0,
  },
  {
    id: "ch-rita",
    category: "personajes",
    question: "¿Qué periodista de El Profeta es una animaga no registrada (escarabajo)?",
    options: ["Rita Skeeter", "Bathilda Bagshot", "Dolores Umbridge", "Pansy Parkinson"],
    answer: 0,
  },
  {
    id: "ch-house-harry",
    category: "personajes",
    question: "¿A qué casa de Hogwarts pertenece Harry Potter?",
    options: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"],
    answer: 0,
  },
  {
    id: "ch-house-luna",
    category: "personajes",
    question: "¿A qué casa pertenece Luna Lovegood?",
    options: ["Ravenclaw", "Gryffindor", "Hufflepuff", "Slytherin"],
    answer: 0,
  },
  {
    id: "ch-house-cedric",
    category: "personajes",
    question: "¿A qué casa pertenecía Cedric Diggory?",
    options: ["Hufflepuff", "Gryffindor", "Ravenclaw", "Slytherin"],
    answer: 0,
  },
  {
    id: "ch-snape-position",
    category: "personajes",
    question: "¿Qué materia enseñaba Severus Snape al inicio de la saga?",
    options: ["Pociones", "Transformaciones", "Encantamientos", "Herbología"],
    answer: 0,
  },
  {
    id: "ch-mcgonagall",
    category: "personajes",
    question: "¿Qué asignatura enseña la profesora McGonagall?",
    options: ["Transformaciones", "Pociones", "Adivinación", "Vuelo"],
    answer: 0,
  },
  {
    id: "ch-hagrid-role",
    category: "personajes",
    question: "¿Cuál es el oficio de Rubeus Hagrid en Hogwarts?",
    options: [
      "Guardabosques (y luego profesor)",
      "Director",
      "Bibliotecario",
      "Celador",
    ],
    answer: 0,
  },
  {
    id: "ch-filch",
    category: "personajes",
    question: "¿Quién es el celador (conserje) de Hogwarts, dueño de la gata Señora Norris?",
    options: ["Argus Filch", "Rubeus Hagrid", "Horace Slughorn", "Peeves"],
    answer: 0,
  },
  {
    id: "ch-voldemort-name",
    category: "personajes",
    question: "¿Cuál es el verdadero nombre de Lord Voldemort?",
    options: [
      "Tom Marvolo Riddle",
      "Salazar Slytherin",
      "Gellert Grindelwald",
      "Tom Sorvolo Black",
    ],
    answer: 0,
  },
  {
    id: "ch-owl",
    category: "personajes",
    question: "¿Cómo se llama la lechuza de Harry Potter?",
    options: ["Hedwig", "Errol", "Pigwidgeon", "Crookshanks"],
    answer: 0,
  },
  {
    id: "ch-ron-rat",
    category: "personajes",
    question: "¿Qué mascota tenía Ron Weasley que resultó ser Peter Pettigrew?",
    options: ["La rata Scabbers", "El gato Crookshanks", "El sapo Trevor", "La lechuza Errol"],
    answer: 0,
  },
  {
    id: "ch-dumbledore-bird",
    category: "personajes",
    question: "¿Cómo se llama el fénix de Albus Dumbledore?",
    options: ["Fawkes", "Nagini", "Buckbeak", "Norbert"],
    answer: 0,
  },
  {
    id: "ch-headmaster",
    category: "personajes",
    question: "¿Quién es el director de Hogwarts durante la mayor parte de la saga?",
    options: [
      "Albus Dumbledore",
      "Severus Snape",
      "Cornelius Fudge",
      "Minerva McGonagall",
    ],
    answer: 0,
  },
  {
    id: "ch-malfoy-house",
    category: "personajes",
    question: "¿A qué casa pertenece Draco Malfoy?",
    options: ["Slytherin", "Gryffindor", "Ravenclaw", "Hufflepuff"],
    answer: 0,
  },
  {
    id: "ch-bellatrix",
    category: "personajes",
    question: "¿Quién mató a Sirius Black?",
    options: ["Bellatrix Lestrange", "Lucius Malfoy", "Peter Pettigrew", "Lord Voldemort"],
    answer: 0,
  },
  {
    id: "ch-trio",
    category: "personajes",
    question: "¿Quiénes forman el trío protagonista de la saga?",
    options: [
      "Harry, Ron y Hermione",
      "Harry, Neville y Luna",
      "Harry, Draco y Ginny",
      "Ron, Fred y George",
    ],
    answer: 0,
  },
];

const creatureQuestions: TriviaQuestion[] = [
  {
    id: "cr-fluffy",
    category: "criaturas",
    question: "¿Qué clase de criatura es Fluffy, el guardián de la piedra filosofal?",
    options: [
      "Un perro de tres cabezas",
      "Un dragón",
      "Un troll",
      "Una serpiente gigante",
    ],
    answer: 0,
  },
  {
    id: "cr-basilisk",
    category: "criaturas",
    question: "¿Qué criatura habita en la Cámara de los Secretos?",
    options: ["Un basilisco", "Una acromántula", "Un hipogrifo", "Un dementor"],
    answer: 0,
  },
  {
    id: "cr-basilisk-gaze",
    category: "criaturas",
    question: "¿Qué provoca la mirada directa de un basilisco?",
    options: ["La muerte", "La petrificación leve", "El sueño", "La invisibilidad"],
    answer: 0,
  },
  {
    id: "cr-dementor",
    category: "criaturas",
    question: "¿De qué se alimentan los dementores?",
    options: [
      "De la felicidad y las almas",
      "De sangre",
      "De recuerdos falsos",
      "De magia oscura",
    ],
    answer: 0,
  },
  {
    id: "cr-hippogriff",
    category: "criaturas",
    question: "¿Cómo se llama el hipogrifo de Hagrid?",
    options: ["Buckbeak (Witherwings)", "Norbert", "Aragog", "Fang"],
    answer: 0,
  },
  {
    id: "cr-aragog",
    category: "criaturas",
    question: "¿Qué tipo de criatura es Aragog?",
    options: ["Una acromántula (araña gigante)", "Un basilisco", "Un dragón", "Un troll"],
    answer: 0,
  },
  {
    id: "cr-dobby",
    category: "criaturas",
    question: "¿Qué clase de criatura es Dobby?",
    options: ["Un elfo doméstico", "Un duende", "Un troll", "Un boggart"],
    answer: 0,
  },
  {
    id: "cr-gringotts",
    category: "criaturas",
    question: "¿Qué criaturas administran el banco mágico Gringotts?",
    options: ["Duendes (goblins)", "Elfos domésticos", "Centauros", "Trolls"],
    answer: 0,
  },
  {
    id: "cr-phoenix",
    category: "criaturas",
    question: "¿Qué habilidad tienen las lágrimas de un fénix?",
    options: [
      "Curan heridas",
      "Vuelven invisible",
      "Provocan sueño",
      "Conceden deseos",
    ],
    answer: 0,
  },
  {
    id: "cr-troll",
    category: "criaturas",
    question: "¿Qué criatura suelta Quirrell en el baño durante el primer año?",
    options: ["Un troll de montaña", "Un dragón", "Un basilisco", "Un hipogrifo"],
    answer: 0,
  },
  {
    id: "cr-norbert",
    category: "criaturas",
    question: "¿Qué especie es Norbert, la mascota de Hagrid?",
    options: [
      "Un dragón (Ridgeback noruego)",
      "Un hipogrifo",
      "Una acromántula",
      "Un thestral",
    ],
    answer: 0,
  },
  {
    id: "cr-thestral",
    category: "criaturas",
    question: "¿Quiénes pueden ver a los thestrals?",
    options: [
      "Quienes han presenciado la muerte",
      "Solo los animagos",
      "Solo los de Slytherin",
      "Nadie, son invisibles siempre",
    ],
    answer: 0,
  },
  {
    id: "cr-boggart",
    category: "criaturas",
    question: "¿En qué se transforma un boggart?",
    options: [
      "En lo que más teme quien lo mira",
      "En un familiar fallecido",
      "En un objeto de oro",
      "En una copia del observador",
    ],
    answer: 0,
  },
  {
    id: "cr-merpeople",
    category: "criaturas",
    question: "¿Qué seres viven en el Lago Negro de Hogwarts?",
    options: ["Sirénidos (gente del agua)", "Centauros", "Veelas", "Goblins"],
    answer: 0,
  },
  {
    id: "cr-centaur",
    category: "criaturas",
    question: "¿Qué criatura mitad humano mitad caballo habita el Bosque Prohibido?",
    options: ["Centauros", "Sátiros", "Hipogrifos", "Thestrals"],
    answer: 0,
  },
  {
    id: "cr-werewolf",
    category: "criaturas",
    question: "¿Qué profesor de Hogwarts era un hombre lobo?",
    options: ["Remus Lupin", "Severus Snape", "Gilderoy Lockhart", "Horace Slughorn"],
    answer: 0,
  },
  {
    id: "cr-veela",
    category: "criaturas",
    question: "¿Qué eran las animadoras del equipo búlgaro en el Mundial de Quidditch?",
    options: ["Veelas", "Sirénidas", "Hadas", "Banshees"],
    answer: 0,
  },
  {
    id: "cr-fang",
    category: "criaturas",
    question: "¿Qué animal es Fang, la mascota de Hagrid?",
    options: ["Un perro jabalinero", "Un lobo", "Un hipogrifo", "Un dragón"],
    answer: 0,
  },
];

const allQuestions: TriviaQuestion[] = [
  ...spellQuestions,
  ...characterQuestions,
  ...creatureQuestions,
];

/** Mezcla un array (Fisher–Yates) sin mutar el original. */
function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Devuelve una copia de la pregunta con las opciones barajadas y el índice recalculado. */
function shuffleOptions(question: TriviaQuestion): TriviaQuestion {
  const correct = question.options[question.answer];
  const options = shuffle(question.options);
  return { ...question, options, answer: options.indexOf(correct) };
}

/**
 * Elige `n` preguntas al azar de la categoría dada (o de todas si es "mezclado"),
 * sin repetir dentro de la partida y con las opciones barajadas.
 */
export function pickQuestions(
  category: TriviaCategoryId,
  n: number = QUESTIONS_PER_GAME,
): TriviaQuestion[] {
  const pool =
    category === "mezclado"
      ? allQuestions
      : allQuestions.filter((q) => q.category === category);

  return shuffle(pool).slice(0, n).map(shuffleOptions);
}
