interface AnimalFacts {
  readonly commonName: string;
  readonly scientificName: string;
}

interface ParkFacts {
  readonly name: string;
  readonly established: number;
  readonly knownFor: string;
  readonly animals: readonly AnimalFacts[];
}

interface CountryFacts {
  readonly name: string;
  readonly parks: readonly ParkFacts[];
}

interface ContinentFacts {
  readonly name: string;
  readonly note?: string;
  readonly countries: readonly CountryFacts[];
}

function animal(commonName: string, scientificName: string): AnimalFacts {
  return { commonName, scientificName };
}

function park(
  name: string,
  established: number,
  knownFor: string,
  ...animals: AnimalFacts[]
): ParkFacts {
  return { name, established, knownFor, animals };
}

const CONTINENTS: readonly ContinentFacts[] = [
  {
    name: "Africa",
    countries: [
      {
        name: "Kenya",
        parks: [
          park(
            "Amboseli",
            1974,
            "elephant herds below Kilimanjaro",
            animal("African bush elephant", "Loxodonta africana"),
          ),
        ],
      },
      {
        name: "Rwanda",
        parks: [
          park(
            "Volcanoes",
            1925,
            "mountain gorillas",
            animal("Mountain gorilla", "Gorilla beringei beringei"),
          ),
        ],
      },
      {
        name: "South Africa",
        parks: [
          park(
            "Kruger",
            1926,
            "the Big Five",
            animal("African bush elephant", "Loxodonta africana"),
            animal("White rhinoceros", "Ceratotherium simum"),
            animal("Leopard", "Panthera pardus"),
          ),
        ],
      },
      {
        name: "Tanzania",
        parks: [
          park(
            "Serengeti",
            1951,
            "the great wildebeest migration",
            animal("Blue wildebeest", "Connochaetes taurinus"),
            animal("Lion", "Panthera leo"),
            animal("Cheetah", "Acinonyx jubatus"),
          ),
        ],
      },
    ],
  },
  {
    name: "Antarctica",
    note: "No national parks. The continent is protected under the Antarctic Treaty.",
    countries: [],
  },
  {
    name: "Asia",
    countries: [
      {
        name: "India",
        parks: [
          park(
            "Jim Corbett",
            1936,
            "being India's first national park",
            animal("Bengal tiger", "Panthera tigris tigris"),
            animal("Asian elephant", "Elephas maximus"),
          ),
          park(
            "Kaziranga",
            1974,
            "most of the world's Indian rhinoceroses",
            animal("Indian rhinoceros", "Rhinoceros unicornis"),
          ),
        ],
      },
      {
        name: "Indonesia",
        parks: [
          park(
            "Komodo",
            1980,
            "the largest living lizard",
            animal("Komodo dragon", "Varanus komodoensis"),
          ),
        ],
      },
      {
        name: "Japan",
        parks: [
          park(
            "Shiretoko",
            1964,
            "drift ice and brown bears",
            animal("Brown bear", "Ursus arctos"),
            animal("Steller's sea eagle", "Haliaeetus pelagicus"),
          ),
        ],
      },
      {
        name: "Nepal",
        parks: [
          park(
            "Chitwan",
            1973,
            "being Nepal's first national park",
            animal("Indian rhinoceros", "Rhinoceros unicornis"),
            animal("Gharial", "Gavialis gangeticus"),
          ),
          park(
            "Sagarmatha",
            1976,
            "Mount Everest",
            animal("Snow leopard", "Panthera uncia"),
            animal("Himalayan tahr", "Hemitragus jemlahicus"),
          ),
        ],
      },
      {
        name: "Thailand",
        parks: [
          park(
            "Khao Yai",
            1962,
            "being Thailand's first national park",
            animal("Asian elephant", "Elephas maximus"),
            animal("Great hornbill", "Buceros bicornis"),
          ),
        ],
      },
    ],
  },
  {
    name: "Europe",
    countries: [
      {
        name: "Croatia",
        parks: [
          park(
            "Plitvice Lakes",
            1949,
            "terraced lakes joined by waterfalls",
            animal("Brown bear", "Ursus arctos"),
            animal("Eurasian lynx", "Lynx lynx"),
          ),
        ],
      },
      {
        name: "Iceland",
        parks: [
          park(
            "Vatnajökull",
            2008,
            "one of Europe's largest ice caps",
            animal("Arctic fox", "Vulpes lagopus"),
          ),
        ],
      },
      {
        name: "Italy",
        parks: [
          park(
            "Gran Paradiso",
            1922,
            "being Italy's first national park",
            animal("Alpine ibex", "Capra ibex"),
          ),
        ],
      },
      {
        name: "Poland",
        parks: [
          park(
            "Białowieża",
            1932,
            "Europe's last primeval lowland forest",
            animal("European bison", "Bison bonasus"),
            animal("Grey wolf", "Canis lupus"),
          ),
          park(
            "Tatra",
            1954,
            "the highest peaks of the Carpathians",
            animal("Tatra chamois", "Rupicapra rupicapra tatrica"),
            animal("Alpine marmot", "Marmota marmota"),
          ),
        ],
      },
      {
        name: "Sweden",
        parks: [
          park(
            "Sarek",
            1909,
            "being among Europe's first national parks",
            animal("Moose", "Alces alces"),
            animal("Wolverine", "Gulo gulo"),
          ),
        ],
      },
      {
        name: "United Kingdom",
        parks: [
          park(
            "Cairngorms",
            2003,
            "being the UK's largest national park",
            animal("Red deer", "Cervus elaphus"),
            animal("Western capercaillie", "Tetrao urogallus"),
          ),
          park(
            "Lake District",
            1951,
            "being England's largest national park",
            animal("Red squirrel", "Sciurus vulgaris"),
          ),
        ],
      },
    ],
  },
  {
    name: "North America",
    countries: [
      {
        name: "Canada",
        parks: [
          park(
            "Banff",
            1885,
            "being Canada's first national park",
            animal("Grizzly bear", "Ursus arctos horribilis"),
            animal("Elk", "Cervus canadensis"),
          ),
        ],
      },
      {
        name: "Costa Rica",
        parks: [
          park(
            "Corcovado",
            1975,
            "dense lowland rainforest",
            animal("Jaguar", "Panthera onca"),
            animal("Scarlet macaw", "Ara macao"),
            animal("Baird's tapir", "Tapirus bairdii"),
          ),
        ],
      },
      {
        name: "United States",
        parks: [
          park(
            "Denali",
            1917,
            "North America's highest peak",
            animal("Caribou", "Rangifer tarandus"),
            animal("Dall sheep", "Ovis dalli"),
          ),
          park(
            "Grand Canyon",
            1919,
            "a canyon over a mile deep",
            animal("California condor", "Gymnogyps californianus"),
            animal("Bighorn sheep", "Ovis canadensis"),
          ),
          park(
            "Yellowstone",
            1872,
            "being the world's first national park",
            animal("American bison", "Bison bison"),
            animal("Grey wolf", "Canis lupus"),
            animal("Grizzly bear", "Ursus arctos horribilis"),
          ),
          park(
            "Yosemite",
            1890,
            "granite cliffs and giant sequoias",
            animal("American black bear", "Ursus americanus"),
            animal("Peregrine falcon", "Falco peregrinus"),
          ),
        ],
      },
    ],
  },
  {
    name: "Oceania",
    countries: [
      {
        name: "Australia",
        parks: [
          park(
            "Kakadu",
            1979,
            "Aboriginal rock art thousands of years old",
            animal("Saltwater crocodile", "Crocodylus porosus"),
          ),
          park(
            "Royal",
            1879,
            "being the world's second-oldest national park",
            animal("Superb lyrebird", "Menura novaehollandiae"),
          ),
        ],
      },
      {
        name: "New Zealand",
        parks: [
          park(
            "Fiordland",
            1952,
            "Milford Sound",
            animal("Kea", "Nestor notabilis"),
            animal("Takahē", "Porphyrio hochstetteri"),
          ),
          park(
            "Tongariro",
            1887,
            "being New Zealand's first national park",
            animal("North Island brown kiwi", "Apteryx mantelli"),
            animal("Blue duck", "Hymenolaimus malacorhynchos"),
          ),
        ],
      },
    ],
  },
  {
    name: "South America",
    countries: [
      {
        name: "Argentina",
        parks: [
          park(
            "Iguazú",
            1934,
            "one of the world's largest waterfall systems",
            animal("Jaguar", "Panthera onca"),
            animal("Toco toucan", "Ramphastos toco"),
          ),
          park(
            "Los Glaciares",
            1937,
            "the Perito Moreno glacier",
            animal("Andean condor", "Vultur gryphus"),
            animal("Huemul", "Hippocamelus bisulcus"),
          ),
        ],
      },
      {
        name: "Chile",
        parks: [
          park(
            "Torres del Paine",
            1959,
            "three granite towers",
            animal("Guanaco", "Lama guanicoe"),
            animal("Puma", "Puma concolor"),
          ),
        ],
      },
      {
        name: "Ecuador",
        parks: [
          park(
            "Galápagos",
            1959,
            "the wildlife that shaped Darwin's thinking",
            animal("Galápagos giant tortoise", "Chelonoidis niger"),
            animal("Marine iguana", "Amblyrhynchus cristatus"),
          ),
        ],
      },
      {
        name: "Peru",
        parks: [
          park(
            "Manu",
            1973,
            "rainforest from the Andes to the Amazon",
            animal("Giant otter", "Pteronura brasiliensis"),
            animal("Jaguar", "Panthera onca"),
          ),
        ],
      },
    ],
  },
];

const OBSERVERS = ["Ranger Ortiz", "Ranger Kim", "Ranger Abara", "Visitor"];
const NOTE =
  "Parks, founding years and species are real. Sightings, visitor counts and rangers are generated for this demo.";

function createRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let mixed = Math.imul(state ^ (state >>> 15), 1 | state);
    mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<Item>(items: readonly Item[], random: () => number): Item {
  return items[Math.floor(random() * items.length)] as Item;
}

function named<Class extends abstract new (...parameters: never[]) => unknown>(
  name: string,
  target: Class,
): Class {
  return Object.defineProperty(target, "name", { value: name });
}

function showGetter(target: object, name: string, get: () => unknown): void {
  Object.defineProperty(target, name, { get, enumerable: true });
}

export const smallPark = {
  name: "Torres del Paine",
  region: "Patagonia",
  country: "Chile",
  established: 1959,
  open: true,
  knownFor: "three granite towers",
  animals: [
    { commonName: "Guanaco", scientificName: "Lama guanicoe" },
    { commonName: "Puma", scientificName: "Puma concolor" },
    { commonName: "Andean condor", scientificName: "Vultur gryphus" },
  ],
};

export function createMediumParks() {
  return { note: NOTE, continents: CONTINENTS };
}

export function createAdvancedParks(sightingsPerAnimal = 30) {
  const random = createRandom(1872);

  const Sighting = named(
    "Sighting",
    class {
      constructor(
        readonly animal: object,
        readonly at: Date,
        readonly groupSize: number,
        readonly observer: string,
      ) {}
    },
  );

  const Animal = named(
    "Animal",
    class {
      readonly sightings: InstanceType<typeof Sighting>[] = [];

      constructor(
        readonly commonName: string,
        readonly scientificName: string,
        readonly park: object,
      ) {
        showGetter(this, "largestGroup", () =>
          Math.max(0, ...this.sightings.map((seen) => seen.groupSize)),
        );
      }
    },
  );

  const Park = named(
    "Park",
    class {
      readonly animals: InstanceType<typeof Animal>[] = [];
      readonly established: Date;
      readonly code: string;
      readonly open: boolean;
      readonly closedUntil: Date | null;
      readonly lastInspection: Date | undefined;
      readonly dailyVisitorLimit: number;
      readonly visitors = new Map<number, number>();
      readonly monthlyRainfall: Float32Array;
      readonly trailDifficulty: Uint8Array;
      readonly closuresByMonth: string[] = [];

      constructor(
        readonly name: string,
        readonly knownFor: string,
        year: number,
        readonly country: object,
      ) {
        this.established = new Date(Date.UTC(year, 0, 1));
        this.code = `${name.slice(0, 2).toUpperCase()}-${year}`;
        this.open = random() > 0.2;
        this.closedUntil = this.open
          ? null
          : new Date(random() > 0.5 ? Date.UTC(2027, 3, 1) : Number.NaN);
        this.lastInspection =
          random() > 0.5 ? new Date(Date.UTC(2026, 5, 12)) : undefined;
        this.dailyVisitorLimit =
          random() > 0.6
            ? Number.POSITIVE_INFINITY
            : 500 + Math.floor(random() * 4500);
        this.trailDifficulty = Uint8Array.from({ length: 6 }, () =>
          Math.ceil(random() * 5),
        );
        this.closuresByMonth[Math.floor(random() * 3)] = "snow";
        this.closuresByMonth[9 + Math.floor(random() * 3)] = "maintenance";
        this.monthlyRainfall = Float32Array.from({ length: 12 }, () =>
          Math.round(10 + random() * 240),
        );
        for (let visited = 2023; visited <= 2025; visited++) {
          this.visitors.set(visited, Math.round(50_000 + random() * 3_000_000));
        }
        showGetter(this, "ageInYears", () => 2026 - year);
      }

      isOlderThan(other: { established: Date }): boolean {
        return this.established < other.established;
      }
    },
  );

  const Country = named(
    "Country",
    class {
      readonly parks: InstanceType<typeof Park>[] = [];

      constructor(
        readonly name: string,
        readonly continent: object,
      ) {}
    },
  );

  const Continent = named(
    "Continent",
    class {
      readonly countries: InstanceType<typeof Country>[] = [];

      constructor(
        readonly name: string,
        readonly note: string | undefined,
      ) {}
    },
  );

  const continents = CONTINENTS.map((continentFacts) => {
    const continent = new Continent(continentFacts.name, continentFacts.note);
    for (const countryFacts of continentFacts.countries) {
      const country = new Country(countryFacts.name, continent);
      for (const facts of countryFacts.parks) {
        const created = new Park(
          facts.name,
          facts.knownFor,
          facts.established,
          country,
        );
        for (const { commonName, scientificName } of facts.animals) {
          const seen = new Animal(commonName, scientificName, created);
          for (let count = 0; count < sightingsPerAnimal; count++) {
            seen.sightings.push(
              new Sighting(
                seen,
                new Date(Date.UTC(2026, 0, 1 + Math.floor(random() * 300), 6)),
                1 + Math.floor(random() ** 3 * 40),
                pick(OBSERVERS, random),
              ),
            );
          }
          created.animals.push(seen);
        }
        country.parks.push(created);
      }
      continent.countries.push(country);
    }
    return continent;
  });

  const countries = continents.flatMap((continent) => continent.countries);
  const parks = countries.flatMap((country) => country.parks);
  const animals = parks.flatMap((created) => created.animals);
  const sightings = animals.flatMap((seen) => seen.sightings);
  const oldestFirst = [...parks].sort(
    (first, second) =>
      first.established.getTime() - second.established.getTime(),
  );
  const byDecade = new Map<string, InstanceType<typeof Park>[]>();
  for (const created of oldestFirst) {
    const decade = `${Math.floor(created.established.getUTCFullYear() / 10) * 10}s`;
    byDecade.set(decade, [...(byDecade.get(decade) ?? []), created]);
  }

  return {
    about: {
      note: NOTE,
      description: [
        "National parks of the world, grouped by continent and country.",
        "Every park links back to its country, and every animal to its park.",
        "Open a branch to explore. Nothing here is fetched from a server.",
      ].join("\n"),
      generatedAt: new Date(Date.UTC(2026, 10, 14)),
      seed: 1872,
      schema: Symbol("world-parks/v1"),
      changes: {},
      [Symbol("internal")]: "symbol keys are listed after text keys",
    },
    continents,
    index: {
      oldest: oldestFirst[0],
      byDecade,
      rangers: new Map(
        parks.map((created) => [created, pick(OBSERVERS, random)]),
      ),
      species: new Set(animals.map((seen) => seen.scientificName)),
      parkCode: /^[A-Z]{2}-\d{4}$/u,
    },
    totals: {
      continents: continents.length,
      countries: countries.length,
      parks: parks.length,
      animals: animals.length,
      sightings: sightings.length,
      visitorsSince1872: BigInt("12345678901234567890"),
      averageGroupSize:
        sightings.reduce((sum, seen) => sum + seen.groupSize, 0) /
        sightings.length,
      parksPerCountryInAntarctica: 0 / 0,
      lowestTemperatureChange: -0,
    },
    helpers: {
      yearsBetween(first: Date, second: Date): number {
        return Math.abs(first.getUTCFullYear() - second.getUTCFullYear());
      },
      isOpen: (candidate: { open: boolean }) => candidate.open,
    },
    recentSightings: sightings.slice(0, 500),
    closures: [
      new RangeError("Daily permits exhausted for Milford Track"),
      new Error("Trail closed: flash flood risk"),
    ],
    emptyReport: null,
    nextAudit: undefined,
    Park,
  };
}
