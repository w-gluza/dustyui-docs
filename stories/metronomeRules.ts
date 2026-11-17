import type { BeatKind } from "dustyui";

export type ClickKind = "accent" | "normal" | "soft" | "silent";

export interface Meter {
  beats: number;
  noteValue: 4 | 8;
}

export interface MetronomeSettings {
  bpm: number;
  meter: Meter;
  subdivision: number;
  beats: readonly BeatKind[];
}

export interface Click {
  beatIndex: number;
  kind: ClickKind;
}

export const MIN_BPM = 40;
export const MAX_BPM = 240;

export const METERS: readonly Meter[] = [
  { beats: 2, noteValue: 4 },
  { beats: 3, noteValue: 4 },
  { beats: 4, noteValue: 4 },
  { beats: 5, noteValue: 4 },
  { beats: 6, noteValue: 8 },
];

const QUARTER_SUBDIVISIONS = [
  { clicks: 1, name: "Quarter notes" },
  { clicks: 2, name: "Eighth notes" },
  { clicks: 3, name: "Triplets" },
  { clicks: 4, name: "Sixteenth notes" },
] as const;

const EIGHTH_SUBDIVISIONS = [
  { clicks: 1, name: "Eighth notes" },
  { clicks: 2, name: "Sixteenth notes" },
] as const;

export function clampBpm(bpm: number): number {
  return Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(bpm)));
}

export function meterLabel(meter: Meter): string {
  return `${String(meter.beats)}/${String(meter.noteValue)}`;
}

export function meterFromLabel(label: string): Meter | undefined {
  return METERS.find((meter) => meterLabel(meter) === label);
}

export function subdivisionsFor(meter: Meter) {
  return meter.noteValue === 8 ? EIGHTH_SUBDIVISIONS : QUARTER_SUBDIVISIONS;
}

export function defaultBeats(meter: Meter): BeatKind[] {
  return Array.from({ length: meter.beats }, (_, index) =>
    index === 0 ? "accent" : "normal",
  );
}

export const DEFAULT_SETTINGS: MetronomeSettings = {
  bpm: 120,
  meter: { beats: 4, noteValue: 4 },
  subdivision: 1,
  beats: defaultBeats({ beats: 4, noteValue: 4 }),
};

export function withMeter(
  settings: MetronomeSettings,
  meter: Meter,
): MetronomeSettings {
  const isOffered = subdivisionsFor(meter).some(
    (option) => option.clicks === settings.subdivision,
  );
  return {
    ...settings,
    meter,
    subdivision: isOffered ? settings.subdivision : 1,
    beats: defaultBeats(meter),
  };
}

export function withBeatKind(
  settings: MetronomeSettings,
  beatIndex: number,
  kind: BeatKind,
): MetronomeSettings {
  return {
    ...settings,
    beats: settings.beats.map((beat, index) =>
      index === beatIndex ? kind : beat,
    ),
  };
}

export function buildClicks(
  settings: Pick<MetronomeSettings, "subdivision" | "beats">,
): Click[] {
  return settings.beats.flatMap((beatKind, beatIndex) => {
    const kind: ClickKind = beatKind === "skipped" ? "silent" : beatKind;
    return Array.from({ length: settings.subdivision }, (_, part): Click => ({
      beatIndex,
      kind: part === 0 || kind === "silent" ? kind : "soft",
    }));
  });
}

export function clickSeconds(
  settings: Pick<MetronomeSettings, "bpm" | "meter" | "subdivision">,
): number {
  const { meter } = settings;
  const isCompound = meter.noteValue === 8 && meter.beats % 3 === 0;
  const beatsPerPulse = isCompound ? 3 : 1;
  return 60 / settings.bpm / beatsPerPulse / settings.subdivision;
}
