import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { BeatPattern, type BeatKind } from "dustyui";

function Pattern({
  initial,
  playingBeat,
}: {
  initial: readonly BeatKind[];
  playingBeat?: number;
}) {
  const [beats, setBeats] = useState(initial);

  return (
    <BeatPattern
      label="Beats"
      beats={beats}
      playingBeat={playingBeat}
      onBeatChange={(index, kind) => {
        setBeats(beats.map((beat, i) => (i === index ? kind : beat)));
      }}
    />
  );
}

const meta = {
  title: "Media/BeatPattern",
  component: Pattern,
  parameters: { layout: "centered" },
  args: { initial: ["accent", "normal", "skipped", "normal"], playingBeat: 1 },
} satisfies Meta<typeof Pattern>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Beat 2, normal" }),
    );
    await expect(
      canvas.getByRole("button", { name: "Beat 2, accent" }),
    ).toBeVisible();
  },
};

export const Dark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};

export const SixBeats: Story = {
  args: {
    initial: ["accent", "normal", "normal", "accent", "normal", "normal"],
    playingBeat: 3,
  },
};
