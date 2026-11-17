import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { RecordSleeve } from "dustyui";
import { HeliosArtwork } from "./RecordArtwork";
import styles from "./Media.module.css";

const meta = {
  title: "Media/RecordSleeve",
  component: RecordSleeve,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { artwork: <HeliosArtwork /> },
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
