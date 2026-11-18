import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";
import { AlbumPlayer, HELIOS } from "./AlbumPlayer";
import { AlbumArtwork } from "./RecordArtwork";
import styles from "./Media.module.css";

const meta = {
  title: "Showcase/AlbumPlayer",
  component: AlbumPlayer,
  parameters: { layout: "centered" },
  args: { album: HELIOS, artwork: <AlbumArtwork />, level: 2 },
  decorators: [(Story) => <div className={styles.sleeve}>{Story()}</div>],
} satisfies Meta<typeof AlbumPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactions: Story = {
  tags: ["!dev"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Helios" }));

    const dialog = await canvas.findByRole("dialog", { name: "Helios" });
    await expect(dialog).toBeVisible();
    const track = canvas.getByRole("button", { name: /Soft Transit/u });
    await waitFor(() => expect(track).toBeVisible());

    await userEvent.click(track);

    await expect(track).toHaveAttribute("aria-current", "true");
    await expect(canvas.getByRole("button", { name: "Pause" })).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Next track" }));
    await expect(
      canvas.getByRole("button", { name: /Glass Fields/u }),
    ).toHaveAttribute("aria-current", "true");

    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
  },
};

export const Playing: Story = {
  args: { defaultExpanded: true, defaultPlaying: true, defaultTrack: 2 },
  play: async ({ canvas }) => {
    await waitFor(() =>
      expect(canvas.getByRole("list", { name: "Tracks" })).toBeVisible(),
    );
  },
};

export const PlayingDark: Story = {
  ...Playing,
  globals: { theme: "dusty", scheme: "dark" },
};
