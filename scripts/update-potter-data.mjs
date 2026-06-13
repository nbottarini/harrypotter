import { mkdir, writeFile } from "node:fs/promises";

const apiBase = "https://api.potterdb.com/v1";
const hpApiCharactersUrl = "https://hp-api.onrender.com/api/characters";
const fallbackImage = "/assets/fallback-potter.svg";

const hpDisplayNameOverrides = new Map([
  ["Ronald Weasley", "Ron Weasley"],
  ["Lord Voldemort/Tom Marvolo Riddle", "Lord Voldemort"],
]);

const potterDbDisplayNameOverrides = new Map([
  ["Albus Percival Wulfric Brian Dumbledore", "Albus Dumbledore"],
  ["Fred Weasley I", "Fred Weasley"],
  ["Fred Weasley", "Fred Weasley II"],
  ["Molly Weasley (née Prewett)", "Molly Weasley"],
  ["Molly Weasley", "Molly Weasley II"],
  ["Nymphadora Lupin (née Tonks)", "Nymphadora Tonks"],
  ["Newton Artemis Fido Scamander", "Newt Scamander"],
  ["Fleur Isabelle Weasley (née Delacour)", "Fleur Delacour"],
  ["Ginevra Potter (née Weasley)", "Ginny Weasley"],
  ["Ronald Weasley", "Ron Weasley"],
  ["Tom Marvolo Riddle", "Lord Voldemort"],
]);

const imageOverrides = new Map([
  ["Albus Dumbledore", "https://static.wikia.nocookie.net/harrypotter/images/7/75/Albus_Dumbledore_%28HBPF_promo%29.jpg"],
  ["Fred Weasley", "https://static.wikia.nocookie.net/harrypotter/images/9/9e/Fred_Weasley_promo_DHF1.jpg"],
  ["Molly Weasley", "https://static.wikia.nocookie.net/harrypotter/images/3/3c/Molly_Weasley_Deathly_Hallows.jpg"],
  ["Nymphadora Tonks", "https://static.wikia.nocookie.net/harrypotter/images/c/c8/Nymphadora_Tonks_DH_promo_headshot_.jpg"],
  ["Newt Scamander", "https://static.wikia.nocookie.net/harrypotter/images/3/36/Newton_Scamander_Profile_crop.png"],
  ["Fleur Delacour", "https://static.wikia.nocookie.net/harrypotter/images/1/1e/Fleur_Delacour.jpg"],
]);

const importantNames = new Set([
  "Harry Potter",
  "Hermione Granger",
  "Ron Weasley",
  "Ginny Weasley",
  "Albus Dumbledore",
  "Minerva McGonagall",
  "Rubeus Hagrid",
  "Neville Longbottom",
  "Sirius Black",
  "Remus Lupin",
  "Fred Weasley",
  "George Weasley",
  "Arthur Weasley",
  "Molly Weasley",
  "Peter Pettigrew",
  "Draco Malfoy",
  "Severus Snape",
  "Lord Voldemort",
  "Bellatrix Lestrange",
  "Lucius Malfoy",
  "Dolores Umbridge",
  "Luna Lovegood",
  "Cho Chang",
  "Cedric Diggory",
  "Nymphadora Tonks",
  "Newt Scamander",
  "Fleur Delacour",
  "Viktor Krum",
  "Gellert Grindelwald",
  "Dobby",
  "Kreacher",
]);

const manualCreatures = [
  {
    id: "hipogrifo",
    name: "Hipogrifo",
    type: "Bestia alada",
    traits: ["Orgulloso", "volador", "sensible al respeto"],
    description: "Criatura mitad aguila y mitad caballo. Exige respeto formal antes de permitir acercamientos.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/c/c7/B3C14M1_cropped_Buckbeak_PM.png",
  },
  {
    id: "elfo-domestico",
    name: "Elfo domestico",
    type: "Ser magico",
    traits: ["Magia propia", "aparicion", "vinculo de servicio"],
    description: "Ser magico pequeno con poderes propios, tradicionalmente ligado al servicio de familias o instituciones magicas.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/8/82/Dobby.jpg",
  },
  {
    id: "fenix",
    name: "Fenix",
    type: "Ave magica",
    traits: ["Renacimiento", "lagrimas curativas", "vuelo potente"],
    description: "Ave magica capaz de renacer de sus cenizas y producir lagrimas con propiedades curativas.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/f/f8/Fawkes_WB_F2_FawkesCloseUpIllustration_Illust_100615_Port.jpg",
  },
  {
    id: "acromantula",
    name: "Acromantula",
    type: "Aracnido magico",
    traits: ["Gigantesca", "habla humana", "venenosa"],
    description: "Arana gigantesca, inteligente y venenosa, capaz de comunicarse con humanos.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/2/2c/Aragog_in_his_lair_COSF.jpg",
  },
  {
    id: "basilisco",
    name: "Basilisco",
    type: "Serpiente gigante",
    traits: ["Mirada letal", "veneno", "control por Parsel"],
    description: "Serpiente gigante cuya mirada directa puede matar.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/4/41/Herpo_the_Foul%27s_Basilisk.png",
  },
  {
    id: "dementor",
    name: "Dementor",
    type: "Ser oscuro",
    traits: ["Drena felicidad", "custodia Azkaban", "vulnerable al Patronus"],
    description: "Entidad que consume emociones positivas y puede absorber el alma con su beso.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/e/ec/Midas_Dementor.PNG",
  },
  {
    id: "perro-tres-cabezas",
    name: "Perro de tres cabezas",
    type: "Guardian magico",
    traits: ["Guardian", "enorme", "calmado por musica"],
    description: "Criatura enorme usada como guardian; puede ser calmada mediante musica.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/1/11/B1C9M3_cropped_Fluffy.png",
  },
  {
    id: "maledictus",
    name: "Maledictus",
    type: "Maldicion sanguinea",
    traits: ["Transformacion irreversible", "maldicion hereditaria", "forma animal"],
    description: "Persona afectada por una maldicion de sangre que termina transformandola permanentemente en una criatura.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/7/70/Nagini_PM.png",
  },
  {
    id: "thestral",
    name: "Thestral",
    type: "Caballo alado",
    traits: ["Visible tras conocer la muerte", "vuelo rapido", "aspecto esqueletico"],
    description: "Especie de caballo alado que tira de los carruajes de Hogwarts.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/4/43/ThestralAtTheMagicalCreaturesReserve.jpg",
  },
  {
    id: "colacuerno-hungaro",
    name: "Colacuerno Hungaro",
    type: "Dragon",
    traits: ["Agresivo", "escamas negras", "fuego"],
    description: "Dragon extremadamente peligroso usado en la primera prueba del Torneo de los Tres Magos.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/8/8b/BuriedVault-HungarianHorntail.jpg",
  },
  {
    id: "niffler",
    name: "Niffler",
    type: "Bestia magica",
    traits: ["Busca objetos brillantes", "bolsa expansiva", "excavador"],
    description: "Criatura pequena obsesionada con tesoros y metales brillantes.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/e/eb/Baby_Niffler_WWHP_1.jpeg",
  },
  {
    id: "bowtruckle",
    name: "Bowtruckle",
    type: "Guardian de arboles",
    traits: ["Pequeno", "camuflaje vegetal", "protector"],
    description: "Criatura que vive en arboles aptos para fabricar varitas.",
  },
  {
    id: "demiguise",
    name: "Demiguise",
    type: "Bestia magica",
    traits: ["Invisibilidad", "precognicion", "pelaje sedoso"],
    description: "Criatura pacifica que puede volverse invisible y anticipar futuros probables.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/6/66/Demiguise_at_Bar_Moonshine.gif",
  },
  {
    id: "occamy",
    name: "Occamy",
    type: "Ave serpentina",
    traits: ["Choranaptyxico", "huevos de plata", "defensivo"],
    description: "Criatura que cambia de tamano para ocupar el espacio disponible.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/c/c2/Occamy_in_Hogsmeade_WWHP.jpeg",
  },
  {
    id: "thunderbird",
    name: "Thunderbird",
    type: "Ave de tormenta",
    traits: ["Genera tormentas", "vuelo poderoso", "sensible al peligro"],
    description: "Ave norteamericana asociada al clima y a tormentas repentinas.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/7/75/Thunderbird_at_the_Magical_Creatures_Reserve.jpg",
  },
  {
    id: "zouwu",
    name: "Zouwu",
    type: "Felino magico",
    traits: ["Enorme", "veloz", "viaja grandes distancias"],
    description: "Criatura felina gigantesca capaz de recorrer distancias inmensas en poco tiempo.",
    image: "https://static.wikia.nocookie.net/harrypotter/images/b/bf/Zouwu_TCOG.jpeg",
  },
];

const magicalSpeciesTranslations = new Map([
  ["acromantula", "Acromantula"],
  ["basilisk", "Basilisco"],
  ["bicorn", "Bicornio"],
  ["bowtruckle", "Bowtruckle"],
  ["centaur", "Centauro"],
  ["chimaera", "Quimera"],
  ["demiguise", "Demiguise"],
  ["dementor", "Dementor"],
  ["dragon", "Dragon"],
  ["dragons", "Dragones"],
  ["elf", "Elfo domestico"],
  ["erumpent", "Erumpent"],
  ["fairy", "Hada"],
  ["fire crab", "Cangrejo de fuego"],
  ["ghoul", "Ghoul"],
  ["giant", "Gigante"],
  ["giants", "Gigantes"],
  ["gnome", "Gnomo"],
  ["goblin", "Duende"],
  ["goblins", "Duendes"],
  ["graphorn", "Graphorn"],
  ["graphorns", "Graphorns"],
  ["griffin", "Grifo"],
  ["grindylow", "Grindylow"],
  ["hag", "Bruja vieja"],
  ["half-giant", "Medio gigante"],
  ["hippogriff", "Hipogrifo"],
  ["house-elf", "Elfo domestico"],
  ["kelpie", "Kelpie"],
  ["leprechaun", "Leprechaun"],
  ["manticore", "Manticora"],
  ["maledictus", "Maledictus"],
  ["merpeople", "Gente del agua"],
  ["murtlap", "Murtlap"],
  ["niffler", "Niffler"],
  ["nundu", "Nundu"],
  ["occamy", "Occamy"],
  ["part-human/quarter-veela", "Parte humana / cuarto veela"],
  ["phoenix", "Fenix"],
  ["poltergeist", "Poltergeist"],
  ["qilin", "Qilin"],
  ["runespoor", "Runespoor"],
  ["selkie", "Selkie"],
  ["sphinx", "Esfinge"],
  ["swooping evil", "Swooping Evil"],
  ["thestral", "Thestral"],
  ["troll", "Troll"],
  ["veela", "Veela"],
  ["vampire", "Vampiro"],
  ["vampires", "Vampiros"],
  ["werewolf", "Licantropo"],
  ["werewolves", "Licantropos"],
  ["wyvern", "Wyvern"],
  ["zouwu", "Zouwu"],
]);

const canonicalSpeciesAliases = new Map([
  ["goblins", "goblin"],
  ["giants", "giant"],
  ["dragons", "dragon"],
  ["vampires", "vampire"],
  ["werewolves", "werewolf"],
  ["graphorns", "graphorn"],
]);

const nonMagicalSpecies = new Set([
  "cat",
  "cats",
  "dog",
  "dogs",
  "goat",
  "goats",
  "horse",
  "horses",
  "owl",
  "owls",
  "rat",
  "rats",
  "snake",
  "snakes",
  "toad",
  "toads",
  "donkey",
  "donkeys",
  "rabbit",
  "rabbits",
  "spider",
  "spiders",
  "wolf",
  "wolves",
]);

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.json();
}

async function fetchPotterDbCollection(resource) {
  const first = await fetchJson(`${apiBase}/${resource}?page[size]=100&page[number]=1`);
  const last = first.meta?.pagination?.last ?? 1;
  const records = [...first.data];

  for (let page = 2; page <= last; page += 1) {
    const data = await fetchJson(`${apiBase}/${resource}?page[size]=100&page[number]=${page}`);
    records.push(...data.data);
  }

  return records;
}

function text(value) {
  if (value === null || value === undefined) return undefined;
  const normalized = String(value).trim();
  return normalized ? normalized : undefined;
}

function list(value) {
  return Array.isArray(value) ? value.map(text).filter(Boolean) : [];
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function houseId(value) {
  const normalized = text(value)?.toLowerCase();
  if (!normalized) return undefined;
  if (normalized.includes("gryffindor")) return "gryffindor";
  if (normalized.includes("slytherin")) return "slytherin";
  if (normalized.includes("ravenclaw")) return "ravenclaw";
  if (normalized.includes("hufflepuff")) return "hufflepuff";
  return undefined;
}

function hpWand(wand) {
  if (!wand) return undefined;
  const parts = [text(wand.wood), text(wand.core), wand.length ? `${wand.length} pulgadas` : undefined].filter(Boolean);
  return parts.length ? parts.join(", ") : undefined;
}

function displayName(name, source) {
  if (source === "hp") return hpDisplayNameOverrides.get(name) || name;
  return potterDbDisplayNameOverrides.get(name) || name;
}

function shouldSkipCharacter(character) {
  const name = character.name.toLowerCase();
  if (importantNames.has(character.name)) return false;
  if (name.includes("unidentified")) return true;
  if (name.includes("spectators")) return true;
  if (name.includes("waiters at")) return true;
  if (name.includes("band at")) return true;
  if (name.endsWith("'s parents") || name.endsWith("' parents")) return true;
  if (name.endsWith("'s father") || name.endsWith("'s mother") || name.endsWith("'s aunt") || name.endsWith("'s uncle")) return true;
  return false;
}

function characterScore(character) {
  let score = importantNames.has(character.name) ? 1000 : 0;
  if (character.image && character.image !== fallbackImage) score += 100;
  if (character.house) score += 40;
  if (character.actor) score += 35;
  if (character.profession) score += 25;
  if (character.family) score += 15;
  if (character.birth) score += 10;
  if (character.tags.length) score += character.tags.length;
  return score;
}

function mergeCharacter(existing, incoming) {
  const merged = { ...existing };
  for (const [key, value] of Object.entries(incoming)) {
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) continue;
    if (key === "tags" || key === "titles" || key === "aliases") {
      merged[key] = Array.from(new Set([...(merged[key] || []), ...value]));
      continue;
    }
    if (key === "image") {
      if (!merged.image || merged.image === fallbackImage || imageOverrides.get(merged.name) === value) merged.image = value;
      continue;
    }
    if (!merged[key]) merged[key] = value;
  }
  return merged;
}

function fromHpApi(item) {
  const name = displayName(text(item.name), "hp");
  const tags = [
    item.hogwartsStudent ? "Estudiante de Hogwarts" : undefined,
    item.hogwartsStaff ? "Personal de Hogwarts" : undefined,
    item.wizard === false ? "No magico" : undefined,
  ].filter(Boolean);

  return {
    id: slugify(name),
    name,
    house: houseId(item.house),
    profession: item.hogwartsStaff ? "Personal de Hogwarts" : item.hogwartsStudent ? "Estudiante de Hogwarts" : undefined,
    species: text(item.species) || "Desconocida",
    actor: text(item.actor),
    patronus: text(item.patronus),
    image: text(item.image) || imageOverrides.get(name) || fallbackImage,
    birth: text(item.dateOfBirth) || (item.yearOfBirth ? String(item.yearOfBirth) : undefined),
    bloodStatus: text(item.ancestry),
    gender: text(item.gender),
    hairColor: text(item.hairColour),
    eyeColor: text(item.eyeColour),
    wand: hpWand(item.wand),
    aliases: list(item.alternate_names),
    tags,
  };
}

function fromPotterDb(item) {
  const attributes = item.attributes;
  const name = displayName(text(attributes.name), "potterdb");
  const jobs = list(attributes.jobs);
  const family = list(attributes.family_members).slice(0, 6);
  const titles = list(attributes.titles);
  const aliases = list(attributes.alias_names);
  const tags = [...jobs.slice(0, 2), ...titles.slice(0, 2), text(attributes.house), text(attributes.species)].filter(Boolean);

  return {
    id: slugify(name),
    name,
    house: houseId(attributes.house),
    family: family.length ? family.join(", ") : undefined,
    profession: jobs.length ? jobs.join(", ") : undefined,
    species: text(attributes.species) || "Desconocida",
    patronus: text(attributes.patronus),
    image: imageOverrides.get(name) || text(attributes.image) || fallbackImage,
    birth: text(attributes.born),
    bloodStatus: text(attributes.blood_status),
    gender: text(attributes.gender),
    nationality: text(attributes.nationality),
    hairColor: text(attributes.hair_color),
    eyeColor: text(attributes.eye_color),
    wand: list(attributes.wands).join(", ") || undefined,
    titles,
    aliases,
    wiki: text(attributes.wiki),
    summary: undefined,
    tags,
  };
}

function mapSpellCategory(category) {
  const value = text(category);
  if (!value) return "Otros";
  const normalized = value.toLowerCase();
  if (normalized.includes("healing")) return "Curacion";
  if (normalized.includes("transfiguration")) return "Transformacion";
  if (normalized.includes("transport")) return "Transporte";
  if (normalized.includes("curse")) return "Maldiciones";
  if (normalized.includes("jinx")) return "Embrujos";
  if (normalized.includes("hex")) return "Maleficios";
  if (normalized.includes("charm")) return "Encantamientos";
  if (normalized.includes("conjuration")) return "Conjuracion";
  if (normalized.includes("spell")) return "Hechizos";
  return value;
}

function fromSpell(item) {
  const attributes = item.attributes;
  const name = text(attributes.name);
  return {
    id: slugify(name),
    name,
    incantation: text(attributes.incantation),
    category: mapSpellCategory(attributes.category),
    effect: text(attributes.effect) || "Efecto no especificado.",
    light: text(attributes.light),
  };
}

function creatureFromSpecies(name, image) {
  const translatedName = magicalSpeciesTranslations.get(canonicalSpecies(name)) || name;
  return {
    id: slugify(translatedName),
    name: translatedName,
    type: "Especie magica",
    traits: ["Registro ampliado", "Mundo magico"],
    description: `Especie o criatura registrada en fuentes del Mundo Magico de Harry Potter: ${translatedName}.`,
    image: image || fallbackImage,
  };
}

function canonicalSpecies(species) {
  const normalized = species
    .toLowerCase()
    .replace(/\(.+?\)/g, "")
    .replace(/,$/, "")
    .replace(/^part-/, "part-")
    .trim();
  return canonicalSpeciesAliases.get(normalized) || normalized;
}

function buildCreatures(characters) {
  const creatureMap = new Map(manualCreatures.map((creature) => [creature.id, creature]));
  const ignoredSpecies = new Set(["human", "humans", "desconocida", "unknown"]);

  for (const character of characters) {
    const species = text(character.species);
    if (!species) continue;
    const normalized = canonicalSpecies(species);
    if (ignoredSpecies.has(normalized)) continue;
    if (nonMagicalSpecies.has(normalized)) continue;
    if (!magicalSpeciesTranslations.has(normalized)) continue;
    if (normalized.includes("human") && !normalized.includes("part-human")) continue;
    const id = slugify(magicalSpeciesTranslations.get(normalized) || normalized);
    if (!id || creatureMap.has(id)) continue;
    creatureMap.set(id, creatureFromSpecies(species, character.image !== fallbackImage ? character.image : undefined));
  }

  return Array.from(creatureMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

async function main() {
  const [hpCharacters, potterCharacters, potterSpells] = await Promise.all([
    fetchJson(hpApiCharactersUrl),
    fetchPotterDbCollection("characters"),
    fetchPotterDbCollection("spells"),
  ]);

  const byId = new Map();
  for (const item of hpCharacters.map(fromHpApi)) {
    byId.set(item.id, mergeCharacter(byId.get(item.id) || {}, item));
  }

  for (const record of potterCharacters) {
    const item = fromPotterDb(record);
    if (shouldSkipCharacter(item)) continue;
    byId.set(item.id, mergeCharacter(byId.get(item.id) || {}, item));
  }

  const characters = Array.from(byId.values())
    .map((character) => ({
      ...character,
      image: imageOverrides.get(character.name) || character.image || fallbackImage,
      tags: Array.from(new Set(character.tags || [])).slice(0, 8),
    }))
    .filter((character) => character.name && character.species)
    .sort((a, b) => characterScore(b) - characterScore(a) || a.name.localeCompare(b.name));

  const spellMap = new Map();
  for (const record of potterSpells) {
    const spell = fromSpell(record);
    if (!spell.name) continue;
    spellMap.set(spell.id, spell);
  }
  const spells = Array.from(spellMap.values()).sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  const creatures = buildCreatures(characters);

  const generated = `/* eslint-disable */
// @ts-nocheck

export const characters = ${JSON.stringify(characters, null, 2)};

export const spells = ${JSON.stringify(spells, null, 2)};

export const creatures = ${JSON.stringify(creatures, null, 2)};
`;

  const index = `export type HouseId = "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff";

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
`;

  await mkdir("src/data", { recursive: true });
  await writeFile("src/data/potterpedia.generated.ts", generated, "utf8");
  await writeFile("src/data/potterpedia.ts", index, "utf8");

  console.log(`Generated ${characters.length} characters, ${spells.length} spells, ${creatures.length} creatures.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
