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

export const FirstCurrent: Story = {
  args: { currentTrack: 0 },
};

export const LastCurrent: Story = {
  args: { currentTrack: HELIOS.tracks.length - 1 },
};

export const LongTitles: Story = {
  args: {
    tracks: [
      {
        title:
          "A slow morning on the coast road, recorded live in one take with the windows open",
        duration: "12:04",
      },
      {
        title: "An_unbroken_file_name_for_a_bonus_track.flac",
        duration: "3:42",
      },
    ],
    currentTrack: 0,
  },
};

export const ManyTracks: Story = {
  args: {
    tracks: Array.from({ length: 120 }, (_, index) => ({
      id: String(index),
      title: `Session take ${String(index + 1)}`,
      duration: "3:42",
    })),
    currentTrack: 99,
  },
};

export const Empty: Story = {
  args: { tracks: [] },
};

export const RightToLeft: Story = {
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};
