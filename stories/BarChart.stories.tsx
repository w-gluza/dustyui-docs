import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { BarChart } from "dustyui";
import styles from "./ProgressBar.module.css";

const meta = {
  title: "Components/BarChart",
  component: BarChart,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Practice this week",
    highlighted: 3,
    bars: [
      { label: "M", value: 12, description: "Monday, 12 minutes" },
      { label: "T", value: 25, description: "Tuesday, 25 minutes" },
      { label: "W", value: 0, description: "Wednesday, no practice" },
      { label: "T", value: 18, description: "Thursday, 18 minutes" },
      { label: "F", value: 0, description: "Friday, no practice" },
      { label: "S", value: 0, description: "Saturday, no practice" },
      { label: "S", value: 0, description: "Sunday, no practice" },
    ],
  },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole("listitem");

    await expect(items).toHaveLength(7);
    await expect(items[3]).toHaveAttribute("aria-current", "true");
    await expect(items[1]).toHaveTextContent("Tuesday, 25 minutes");
  },
};

export const Dark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const CustomValueText: Story = {
  args: {
    label: "Downloads",
    highlighted: undefined,
    bars: [
      { label: "Jan", value: 1200, valueLabel: "1.2k" },
      { label: "Feb", value: 800, valueLabel: "800" },
      { label: "Mar", value: 2100, valueLabel: "2.1k" },
      { label: "Apr", value: 400, valueLabel: "<1k" },
    ],
  },
};
