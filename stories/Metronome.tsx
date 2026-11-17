import { useMemo, useState } from "react";
import {
  BeatPattern,
  IconButton,
  Popover,
  RadioGroup,
  TempoDial,
} from "dustyui";
import { MinusIcon, PauseIcon, PlayIcon, PlusIcon } from "./icons";
import {
  buildClicks,
  clampBpm,
  clickSeconds,
  DEFAULT_SETTINGS,
  MAX_BPM,
  meterFromLabel,
  meterLabel,
  METERS,
  MIN_BPM,
  subdivisionsFor,
  withBeatKind,
  withMeter,
} from "./metronomeRules";
import { useMetronomePlayback } from "./useMetronomePlayback";
import styles from "./Metronome.module.css";

const METER_OPTIONS = METERS.map((meter) => ({
  value: meterLabel(meter),
  label: meterLabel(meter),
}));

export function Metronome() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const { bpm, meter, subdivision, beats } = settings;
  const clicks = useMemo(
    () => buildClicks({ subdivision, beats }),
    [subdivision, beats],
  );
  const subdivisions = subdivisionsFor(meter);
  const subdivisionName =
    subdivisions.find((option) => option.clicks === subdivision)?.name ?? "";
  const playback = useMetronomePlayback(clicks, clickSeconds(settings));

  function changeBpm(next: number) {
    setSettings((current) => ({ ...current, bpm: clampBpm(next) }));
  }

  return (
    <section className={styles.metronome} aria-label="Metronome">
      <div className={styles.rhythm}>
        <Popover
          trigger={meterLabel(meter)}
          triggerLabel={`Time signature, ${meterLabel(meter)}`}
          chevron={false}
          closeOnSelect
        >
          <RadioGroup
            legend="Time signature"
            legendHidden
            options={METER_OPTIONS}
            value={meterLabel(meter)}
            onValueChange={(label) => {
              const next = meterFromLabel(label);
              if (next) {
                setSettings((current) => withMeter(current, next));
              }
            }}
          />
        </Popover>
        <span className={styles.separator} />
        <Popover
          trigger={
            <>
              <span className={styles.note} aria-hidden="true">
                ♫
              </span>
              {subdivisionName}
            </>
          }
          triggerLabel={`Subdivision, ${subdivisionName}`}
          closeOnSelect
        >
          <RadioGroup
            legend="Subdivision"
            legendHidden
            options={subdivisions.map((option) => ({
              value: String(option.clicks),
              label: option.name,
            }))}
            value={String(subdivision)}
            onValueChange={(value) => {
              setSettings((current) => ({
                ...current,
                subdivision: Number(value),
              }));
            }}
          />
        </Popover>
      </div>

      <div className={styles.stage}>
        <IconButton
          variant="plain"
          label="Slower"
          icon={<MinusIcon />}
          aria-disabled={bpm <= MIN_BPM}
          onClick={() => {
            changeBpm(bpm - 1);
          }}
        />
        <TempoDial
          className={styles.dial}
          label="Tempo"
          unit="BPM"
          min={MIN_BPM}
          max={MAX_BPM}
          value={bpm}
          valueText={(value) => `${String(value)} beats per minute`}
          onValueChange={changeBpm}
        />
        <IconButton
          variant="plain"
          label="Faster"
          icon={<PlusIcon />}
          aria-disabled={bpm >= MAX_BPM}
          onClick={() => {
            changeBpm(bpm + 1);
          }}
        />
      </div>

      <BeatPattern
        label="Beats"
        beats={beats}
        playingBeat={playback.playingBeat}
        onBeatChange={(index, kind) => {
          setSettings((current) => withBeatKind(current, index, kind));
        }}
      />

      <IconButton
        className={styles.play}
        shape="pill"
        label={playback.playing ? "Pause" : "Play"}
        icon={playback.playing ? <PauseIcon /> : <PlayIcon />}
        onClick={playback.toggle}
      />
    </section>
  );
}
