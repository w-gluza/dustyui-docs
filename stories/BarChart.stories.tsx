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
    current: 3,
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
  parameters: {
    docs: {
      description: {
        story:
          "`highlighted` emphasises a bar without announcing it. Use `current` when the bar stands for now, such as today; it is announced as current.",
      },
    },
  },
  args: {
    label: "Downloads",
    current: undefined,
    highlighted: 2,
    bars: [
      { label: "Jan", value: 1200, valueLabel: "1.2k" },
      { label: "Feb", value: 800, valueLabel: "800" },
      { label: "Mar", value: 2100, valueLabel: "2.1k" },
      { label: "Apr", value: 400, valueLabel: "<1k" },
    ],
  },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};

export const MonoDark: Story = {
  globals: { theme: "mono", scheme: "dark" },
};

const MONTH = Array.from({ length: 30 }, (_, index) => ({
  label: String(index + 1),
  value: 400 + ((index * 37) % 23) * 520,
}));

export const ManyBars: Story = {
  args: { label: "Steps this month", bars: MONTH, current: 17 },
  parameters: {
    docs: {
      description: {
        story:
          "When the columns get narrow the values hide first, then the axis labels. The highlighted bar keeps its axis label.",
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(30);
  },
};

export const MaxAboveTheData: Story = {
  args: { max: 60 },
};

export const AllZeros: Story = {
  args: {
    current: undefined,
    bars: ["M", "T", "W", "T", "F", "S", "S"].map((label) => ({
      label,
      value: 0,
    })),
  },
};

export const NoBars: Story = {
  args: { bars: [], current: undefined },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("list", { name: "Practice this week" }).children,
    ).toHaveLength(0);
  },
};

export const RightToLeft: Story = {
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};
