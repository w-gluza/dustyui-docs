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
