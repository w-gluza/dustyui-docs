import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { TrackList } from "dustyui";
import { HELIOS } from "./AlbumPlayer";
import styles from "./Media.module.css";

const meta = {
  title: "Media/TrackList",
  component: TrackList,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Tracks",
    tracks: HELIOS.tracks,
    currentTrack: 1,
    onTrackSelect: fn(),
  },
  decorators: [(Story) => <div className={styles.wide}>{Story()}</div>],
} satisfies Meta<typeof TrackList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await expect(
      canvas.getByRole("button", { name: /Soft Transit/u }),
    ).toHaveAttribute("aria-current", "true");

    await userEvent.click(canvas.getByRole("button", { name: /Low Sun/u }));
    await expect(args.onTrackSelect).toHaveBeenCalledWith(3);
  },
};

export const Dark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};

export const NothingCurrent: Story = {
  args: { currentTrack: undefined },
};
