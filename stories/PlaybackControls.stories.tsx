import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { PlaybackControls, type PlaybackControlsProps } from "dustyui";
import styles from "./Media.module.css";

type StoryProps = Omit<PlaybackControlsProps, "playing" | "defaultPlaying"> & {
  defaultPlaying?: boolean;
};

const meta = {
  title: "Media/PlaybackControls",
  component: PlaybackControls,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    progress: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
  },
  args: {
    progress: 0.35,
    onPlayingChange: fn(),
    onPrevious: fn(),
    onNext: fn(),
  },
  decorators: [(Story) => <div className={styles.wide}>{Story()}</div>],
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Play" }));
    await expect(canvas.getByRole("button", { name: "Pause" })).toBeVisible();
    await expect(args.onPlayingChange).toHaveBeenCalledWith(true);

    await userEvent.click(canvas.getByRole("button", { name: "Next track" }));
    await expect(args.onNext).toHaveBeenCalledOnce();
  },
};

export const Playing: Story = {
  args: { defaultPlaying: true },
};

export const PlayingDark: Story = {
  ...Playing,
  globals: { theme: "dusty", scheme: "dark" },
};

export const FirstTrack: Story = {
  args: { onPrevious: undefined },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Previous track" }),
    ).toHaveAttribute("aria-disabled", "true");
  },
};

export const WithoutProgress: Story = {
  args: { progress: undefined },
};

function ControlledPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <PlaybackControls
      playing={playing}
      onPlayingChange={setPlaying}
      progress={0.35}
      onPrevious={() => {}}
      onNext={() => {}}
    />
  );
}

export const Controlled: Story = {
  render: () => <ControlledPlayer />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Play" }));

    await expect(canvas.getByRole("button", { name: "Pause" })).toBeVisible();
  },
};

export const TranslatedLabels: Story = {
  args: {
    labels: {
      play: "Odtwórz",
      pause: "Wstrzymaj",
      previous: "Poprzedni utwór",
      next: "Następny utwór",
      progress: "Postęp utworu",
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Odtwórz" })).toBeVisible();
  },
};

export const LastTrack: Story = {
  args: { onNext: undefined },
};

export const SingleTrack: Story = {
  args: { onPrevious: undefined, onNext: undefined },
};

export const AtTheStart: Story = {
  args: { progress: 0 },
};

export const AtTheEnd: Story = {
  args: { progress: 1 },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};

export const RightToLeft: Story = {
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};

export const KeyboardFocus: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();

    await expect(
      canvas.getByRole("button", { name: "Previous track" }),
    ).toHaveFocus();
  },
};
