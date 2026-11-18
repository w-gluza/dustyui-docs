import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";
import { Metronome } from "./Metronome";
import { MetronomeGuide } from "./MetronomeGuide";
import styles from "./MetronomeGuide.module.css";

const meta = {
  title: "Showcase/Metronome",
  component: Metronome,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className={styles.layout}>
        {Story()}
        <MetronomeGuide />
      </div>
    ),
  ],
} satisfies Meta<typeof Metronome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const Interactions: Story = {
  tags: ["!dev"],
  globals: { theme: "dusty", scheme: "dark" },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const playing = () => canvasElement.querySelectorAll("[data-playing]");
    const tempo = canvas.getByRole("slider", { name: "Tempo" });

    await expect(tempo).toHaveValue("120");
    await userEvent.click(canvas.getByRole("button", { name: "Faster" }));
    await expect(tempo).toHaveValue("121");

    await userEvent.click(
      canvas.getByRole("button", { name: "Time signature, 4/4" }),
    );
    await userEvent.click(await canvas.findByRole("radio", { name: "3/4" }));
    await expect(
      canvas.getByRole("button", { name: "Time signature, 3/4" }),
    ).toHaveAttribute("aria-expanded", "false");
    await expect(
      canvas.getAllByRole("button", { name: /^Beat/u }),
    ).toHaveLength(3);

    await userEvent.click(
      canvas.getByRole("button", { name: "Beat 2, normal" }),
    );
    await expect(
      canvas.getByRole("button", { name: "Beat 2, accent" }),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Play" }));
    await waitFor(() => expect(playing()).toHaveLength(1));

    await userEvent.click(canvas.getByRole("button", { name: "Pause" }));
    await waitFor(() => expect(playing()).toHaveLength(0));
    await expect(canvas.getByRole("button", { name: "Play" })).toBeVisible();
  },
};

export const Light: Story = {
  globals: { theme: "dusty", scheme: "light" },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};
