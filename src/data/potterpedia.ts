export type HouseId = "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";

export type House = {
  id: HouseId;
  name: string;
  founder: string;
  traits: string[];
  colors: string;
  crest: string;
  accent: string;
  border: string;
  bg: string;
};

export type Character = {
  id: string;
  name: string;
  house?: HouseId;
  family?: string;
  profession?: string;
  species: string;
  actor?: string;
  patronus?: string;
  image?: string;
  birth?: string;
  bloodStatus?: string;
  gender?: string;
  nationality?: string;
  hairColor?: string;
  eyeColor?: string;
  wand?: string;
  titles?: string[];
  aliases?: string[];
  wiki?: string;
  summary?: string;
  tags: string[];
};

export type Spell = {
  id: string;
  name: string;
  incantation?: string;
  category: string;
  effect: string;
  light?: string;
};

export type Creature = {
  id: string;
  name: string;
  type: string;
  traits: string[];
  description: string;
  image?: string;
};

export const houses: House[] = [
  {
    id: "gryffindor",
    name: "Gryffindor",
    founder: "Godric Gryffindor",
    traits: ["Coraje", "determinacion", "lealtad"],
    colors: "Escarlata y dorado",
    crest: "/assets/crest-gryffindor.svg",
    accent: "text-[#f5c45e]",
    border: "border-[#8f1d22]/70",
    bg: "from-[#6f1418] via-[#2a0d10] to-[#090809]",
  },
  {
    id: "slytherin",
    name: "Slytherin",
    founder: "Salazar Slytherin",
    traits: ["Ambicion", "astucia", "recursos"],
    colors: "Verde y plata",
    crest: "/assets/crest-slytherin.svg",
    accent: "text-[#8bd8b0]",
    border: "border-[#1b6b4b]/70",
    bg: "from-[#0d5138] via-[#09251d] to-[#070908]",
  },
  {
    id: "ravenclaw",
    name: "Ravenclaw",
    founder: "Rowena Ravenclaw",
    traits: ["Ingenio", "aprendizaje", "creatividad"],
    colors: "Azul y bronce",
    crest: "/assets/crest-ravenclaw.svg",
    accent: "text-[#b7c9ff]",
    border: "border-[#254d91]/70",
    bg: "from-[#163f7f] via-[#0c1d38] to-[#07090d]",
  },
  {
    id: "hufflepuff",
    name: "Hufflepuff",
    founder: "Helga Hufflepuff",
    traits: ["Justicia", "paciencia", "trabajo"],
    colors: "Amarillo y negro",
    crest: "/assets/crest-hufflepuff.svg",
    accent: "text-[#f3d56b]",
    border: "border-[#a8871b]/70",
    bg: "from-[#8b6a08] via-[#2d260d] to-[#080807]",
  },
];

export const houseById = Object.fromEntries(houses.map((house) => [house.id, house])) as Record<HouseId, House>;

import {
  characters as generatedCharacters,
  creatures as generatedCreatures,
  spells as generatedSpells,
} from "./potterpedia.generated";

export const characters = generatedCharacters as Character[];
export const creatures = generatedCreatures as Creature[];
export const spells = generatedSpells as Spell[];

export const spellCategories = Array.from(new Set(spells.map((spell) => spell.category)));

export function getCharactersByHouse(house: HouseId) {
  return characters.filter((character) => character.house === house);
}

export function getCharacterById(id: string) {
  return characters.find((character) => character.id === id);
}
