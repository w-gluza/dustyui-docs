import { useEffect, useRef, useState } from "react";
import type { Click, ClickKind } from "./metronomeRules";

const LOOKAHEAD_MS = 100;
const TICK_MS = 25;
const CLICK_SECONDS = 0.04;

const TONES: Record<Exclude<ClickKind, "silent">, [number, number]> = {
  accent: [1568, 0.5],
  normal: [1047, 0.4],
  soft: [784, 0.15],
};

function playClick(audio: AudioContext | null, kind: ClickKind, atMs: number) {
  if (!audio || audio.state !== "running" || kind === "silent") {
    return;
  }
  const [frequency, level] = TONES[kind];
  const when =
    audio.currentTime + Math.max(0, (atMs - performance.now()) / 1000);
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(level, when);
  gain.gain.exponentialRampToValueAtTime(0.001, when + CLICK_SECONDS);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start(when);
  oscillator.stop(when + CLICK_SECONDS);
}

export function useMetronomePlayback(
  clicks: readonly Click[],
  seconds: number,
) {
  const [playing, setPlaying] = useState(false);
  const [activeClick, setActiveClick] = useState<number | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const latest = useRef({ clicks, seconds });

  useEffect(() => {
    latest.current = { clicks, seconds };
  }, [clicks, seconds]);

  useEffect(() => {
    if (!playing) {
      return;
    }
    const timers = new Set<number>();
    let index = 0;
    let nextMs = performance.now() + TICK_MS;

    const schedule = () => {
      const now = performance.now();
      while (nextMs < now + LOOKAHEAD_MS) {
        const current = latest.current;
        const position = index % current.clicks.length;
        const click = current.clicks[position];
        if (click) {
          playClick(audio.current, click.kind, nextMs);
        }
        const timer = window.setTimeout(
          () => {
            timers.delete(timer);
            setActiveClick(position);
          },
          Math.max(0, nextMs - now),
        );
        timers.add(timer);
        index = position + 1;
        nextMs += current.seconds * 1000;
      }
    };

    schedule();
    const interval = window.setInterval(schedule, TICK_MS);
    return () => {
      window.clearInterval(interval);
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, [playing]);

  useEffect(
    () => () => {
      audio.current?.close().catch(() => undefined);
      audio.current = null;
    },
    [],
  );

  function toggle() {
    if (!playing) {
      if (!audio.current || audio.current.state === "closed") {
        audio.current = new AudioContext();
      }
      audio.current.resume().catch(() => undefined);
    }
    setActiveClick(null);
    setPlaying(!playing);
  }

  const click =
    playing && activeClick !== null ? clicks[activeClick] : undefined;

  return { playing, playingBeat: click?.beatIndex, toggle };
}
