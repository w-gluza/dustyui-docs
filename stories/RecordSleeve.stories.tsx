import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { PlaybackControls, RecordSleeve } from "dustyui";
import { AlbumArtwork } from "./RecordArtwork";
import styles from "./Media.module.css";

const meta = {
  title: "Media/RecordSleeve",
  component: RecordSleeve,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { artwork: <AlbumArtwork /> },
} satisfies Meta<typeof RecordSleeve>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tucked: Story = {
  decorators: [(Story) => <div className={styles.sleeve}>{Story()}</div>],
};

export const Revealed: Story = {
  args: { revealed: true, "data-testid": "sleeve" } as Story["args"],
  decorators: [(Story) => <div className={styles.wide}>{Story()}</div>],
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId("sleeve")).toHaveAttribute("data-revealed");
  },
};

export const Playing: Story = {
  ...Revealed,
  args: { ...Revealed.args, playing: true },
};

export const PlayingDark: Story = {
  ...Playing,
  globals: { theme: "dusty", scheme: "dark" },
};

export const PlayingMono: Story = {
  ...Playing,
  globals: { theme: "mono", scheme: "light" },
};

export const RevealedDark: Story = {
  ...Revealed,
  globals: { theme: "dusty", scheme: "dark" },
};

export const PlayingMonoDark: Story = {
  ...Playing,
  globals: { theme: "mono", scheme: "dark" },
};

export const RightToLeft: Story = {
  ...Revealed,
  decorators: [
    (Story) => (
      <div dir="rtl" className={styles.wide}>
        {Story()}
      </div>
    ),
  ],
};

export const SmallStage: Story = {
  ...Revealed,
  decorators: [(Story) => <div style={{ inlineSize: "8rem" }}>{Story()}</div>],
};

const PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 5'%3E%3Crect width='12' height='5' fill='%23e98973'/%3E%3Ccircle cx='6' cy='2.5' r='2' fill='%23f1c86a'/%3E%3C/svg%3E";

export const ImageArtwork: Story = {
  args: { artwork: <img alt="" src={PHOTO} /> },
  decorators: [(Story) => <div className={styles.sleeve}>{Story()}</div>],
};

function SleeveWithPause() {
  const [playing, setPlaying] = useState(true);

  return (
    <div className={styles.wide}>
      <RecordSleeve artwork={<AlbumArtwork />} revealed playing={playing} />
      <PlaybackControls playing={playing} onPlayingChange={setPlaying} />
    </div>
  );
}

export const WithPauseControl: Story = {
  render: () => <SleeveWithPause />,
  parameters: {
    docs: {
      description: {
        story:
          "The record spins for as long as `playing` is true, so pair it with a visible control that pauses it.",
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Pause" }));

    await expect(canvas.getByRole("button", { name: "Play" })).toBeVisible();
  },
};
