import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fireEvent, fn } from "storybook/test";
import { TempoDial, type TempoDialProps } from "dustyui";
import styles from "./Metronome.module.css";

type StoryProps = Omit<TempoDialProps, "value" | "defaultValue"> & {
  defaultValue?: number;
};

const meta = {
  title: "Media/TempoDial",
  component: TempoDial,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Tempo",
    unit: "BPM",
    min: 40,
    max: 240,
    defaultValue: 120,
    onValueChange: fn(),
  },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas }) => {
    const slider = canvas.getByRole("slider", { name: "Tempo" });

    await fireEvent.change(slider, { target: { value: "121" } });

    await expect(slider).toHaveValue("121");
    await expect(slider).toHaveAttribute("aria-valuetext", "121 BPM");
    await expect(args.onValueChange).toHaveBeenCalledWith(121);
  },
};

export const Dark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};

export const Volume: Story = {
  args: {
    label: "Volume",
    unit: "%",
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 65,
  },
};
