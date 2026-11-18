import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fireEvent, fn, userEvent } from "storybook/test";
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

function ControlledDial() {
  const [tempo, setTempo] = useState(96);

  return (
    <TempoDial
      label="Tempo"
      unit="BPM"
      min={40}
      max={240}
      value={tempo}
      onValueChange={setTempo}
    />
  );
}

export const Controlled: Story = {
  render: () => <ControlledDial />,
  play: async ({ canvas }) => {
    const slider = canvas.getByRole("slider", { name: "Tempo" });

    await fireEvent.change(slider, { target: { value: "98" } });

    await expect(slider).toHaveValue("98");
  },
};

export const FractionalStep: Story = {
  args: {
    label: "Gain",
    unit: "dB",
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: 0.3,
  },
};

export const LongValue: Story = {
  args: {
    label: "Frequency",
    unit: "Hz",
    min: 20,
    max: 20000,
    step: 10,
    defaultValue: 12500,
  },
};

export const Small: Story = {
  decorators: [(Story) => <div style={{ inlineSize: "8rem" }}>{Story()}</div>],
};

export const RightToLeft: Story = {
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};

export const KeyboardFocus: Story = {
  play: async ({ canvas }) => {
    await userEvent.tab();

    await expect(canvas.getByRole("slider", { name: "Tempo" })).toHaveFocus();
  },
};
