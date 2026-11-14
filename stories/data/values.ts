class Sighting {
  species = "Bison bison";
  groupSize = 24;
}

export function createEveryKind() {
  return {
    text: "Old Faithful",
    count: 42,
    big: BigInt("9007199254740993"),
    flag: false,
    nothing: null,
    missing: undefined,
    id: Symbol("park"),
    when: new Date("2026-11-14T10:00:00.000Z"),
    pattern: /bison|wolf/giu,
    failure: new RangeError("count out of range"),
    greet(name: string) {
      return `Hello ${name}`;
    },
    Sighting,
    sighting: new Sighting(),
    tags: new Set(["geyser", "wildlife"]),
    visitors: new Map([
      [2024, 4_744_353],
      [2025, 4_501_382],
    ]),
    bytes: new Uint8Array([1, 2, 3]),
  };
}

export function createTricky() {
  const value: Record<string, unknown> = {
    get expensive() {
      return 1;
    },
    refuses: new Proxy(
      {},
      {
        ownKeys() {
          throw new Error("this object refuses to be read");
        },
      },
    ),
  };
  value.self = value;
  return value;
}
