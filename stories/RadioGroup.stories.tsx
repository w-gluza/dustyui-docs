import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { RadioGroup, type RadioGroupProps } from "dustyui";
import styles from "./Metronome.module.css";

type StoryProps = Omit<RadioGroupProps, "value" | "defaultValue"> & {
  defaultValue?: string;
};

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    legend: "Subdivision",
    options: [
      { value: "1", label: "Quarter notes" },
      { value: "2", label: "Eighth notes" },
      { value: "3", label: "Triplets" },
      { value: "4", label: "Sixteenth notes" },
    ],
    defaultValue: "1",
    onValueChange: fn(),
  },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "Triplets" }));

    await expect(canvas.getByRole("radio", { name: "Triplets" })).toBeChecked();
    await expect(args.onValueChange).toHaveBeenCalledWith("3");
  },
};

export const Dark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const HiddenLegend: Story = {
  args: { legendHidden: true },
};

const SUBDIVISIONS = [
  { value: "1", label: "Quarter notes" },
  { value: "2", label: "Eighth notes" },
  { value: "3", label: "Triplets" },
];

function ControlledGroup() {
  const [value, setValue] = useState("2");

  return (
    <RadioGroup
      legend="Subdivision"
      options={SUBDIVISIONS}
      value={value}
      onValueChange={setValue}
    />
  );
}

export const Controlled: Story = {
  render: () => <ControlledGroup />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "Triplets" }));

    await expect(canvas.getByRole("radio", { name: "Triplets" })).toBeChecked();
  },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};

export const NothingSelected: Story = {
  args: { defaultValue: "" },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("radio", { name: "Triplets" }),
    ).toBeDisabled();
  },
};

export const LongLabels: Story = {
  args: {
    options: [
      {
        value: "1",
        label: "Quarter notes, one click on every beat of the bar",
      },
      {
        value: "2",
        label: "Eighth notes, with a quieter click between the beats",
      },
    ],
  },
};

export const TwoGroups: Story = {
  render: () => (
    <>
      <RadioGroup
        legend="Subdivision"
        options={SUBDIVISIONS}
        defaultValue="1"
      />
      <RadioGroup
        legend="Accent"
        options={[
          { value: "first", label: "First beat" },
          { value: "none", label: "No accent" },
        ]}
        defaultValue="first"
      />
    </>
  ),
};

export const RightToLeft: Story = {
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};

export const KeyboardFocus: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();

    await expect(
      canvas.getByRole("radio", { name: "Quarter notes" }),
    ).toHaveFocus();
  },
};

export const Required: Story = {
  args: { required: true, defaultValue: undefined, name: "subdivision" },
  decorators: [(Story) => <form aria-label="Metronome">{Story()}</form>],
  play: async ({ canvas, userEvent }) => {
    const form = canvas.getByRole<HTMLFormElement>("form");
    await expect(form.checkValidity()).toBe(false);

    await userEvent.click(canvas.getByRole("radio", { name: "Triplets" }));
    await expect(form.checkValidity()).toBe(true);
  },
};

export const RequiredWithTheChosenOptionDisabled: Story = {
  args: {
    required: true,
    name: "subdivision",
    defaultValue: "1",
    options: [
      { value: "1", label: "Quarter notes", disabled: true },
      { value: "2", label: "Eighth notes" },
      { value: "3", label: "Triplets" },
    ],
  },
  decorators: [(Story) => <form aria-label="Metronome">{Story()}</form>],
  play: async ({ canvas, userEvent }) => {
    const form = canvas.getByRole<HTMLFormElement>("form");
    await expect(
      canvas.getByRole("radio", { name: "Quarter notes" }),
    ).toBeChecked();
    await expect(form.checkValidity()).toBe(false);

    await userEvent.click(canvas.getByRole("radio", { name: "Triplets" }));
    await expect(form.checkValidity()).toBe(true);
  },
};
