import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { BeatPattern, type BeatPatternProps } from "dustyui";
import styles from "./BeatPattern.module.css";

function Editable({
  beats: initial,
  onBeatChange,
  ...props
}: BeatPatternProps) {
  const [beats, setBeats] = useState(initial);

  return (
    <BeatPattern
      {...props}
      beats={beats}
      onBeatChange={(index, kind) => {
        setBeats(beats.map((beat, i) => (i === index ? kind : beat)));
        return onBeatChange(index, kind);
      }}
    />
  );
}

const meta = {
  title: "Media/BeatPattern",
  component: BeatPattern,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Beats",
    beats: ["accent", "normal", "skipped", "normal"],
    playingBeat: 1,
    onBeatChange: fn(),
  },
  render: (args) => <Editable {...args} />,
} satisfies Meta<typeof BeatPattern>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Beat 2, normal" }),
    );
    await expect(
      canvas.getByRole("button", { name: "Beat 2, accent" }),
    ).toBeVisible();
    await expect(args.onBeatChange).toHaveBeenCalledWith(1, "accent");
  },
};

export const Dark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};

export const MonoDark: Story = {
  globals: { theme: "mono", scheme: "dark" },
};

export const SixBeats: Story = {
  args: {
    beats: ["accent", "normal", "normal", "accent", "normal", "normal"],
    playingBeat: 3,
  },
};

export const NothingPlaying: Story = {
  args: { playingBeat: undefined },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("[data-playing]")).toBeNull();
  },
};

export const PlayingAnAccent: Story = {
  args: { playingBeat: 0 },
};

export const PlayingASkippedBeat: Story = {
  args: { playingBeat: 2 },
};

export const TranslatedBeatNames: Story = {
  args: {
    label: "Takty",
    beatLabel: (beat, kind) =>
      `Takt ${String(beat)}, ${{ normal: "zwykły", accent: "akcent", skipped: "pominięty" }[kind]}`,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Takt 1, akcent" }),
    ).toBeVisible();
  },
};

export const Wrapping: Story = {
  args: {
    beats: [
      "accent",
      "normal",
      "normal",
      "normal",
      "accent",
      "normal",
      "skipped",
      "normal",
      "accent",
      "normal",
      "normal",
    ],
    playingBeat: 5,
  },
  decorators: [(Story) => <div className={styles.narrow}>{Story()}</div>],
};

export const RightToLeft: Story = {
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};
