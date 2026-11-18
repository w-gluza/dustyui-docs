import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { StackedProgress } from "dustyui";
import styles from "./ProgressBar.module.css";

const meta = {
  title: "Components/StackedProgress",
  component: StackedProgress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Project time",
    segments: [
      { label: "Design", value: 0.38 },
      { label: "Build", value: 0.26 },
      { label: "Review", value: 0.21 },
    ],
  },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<typeof StackedProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const list = canvas.getByRole("list", { name: "Project time" });

    await expect(list).toHaveTextContent("38% Design");
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
  },
};

export const Dark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};

export const CustomWhole: Story = {
  args: {
    label: "Storage",
    max: 256,
    segments: [
      { label: "Photos", value: 96 },
      { label: "Music", value: 48 },
      { label: "Documents", value: 24 },
      { label: "Apps", value: 32 },
      { label: "Other", value: 16 },
    ],
  },
};

export const Full: Story = {
  args: {
    segments: [
      { label: "Design", value: 2 },
      { label: "Build", value: 1 },
      { label: "Review", value: 1 },
    ],
  },
};

export const GridLegend: Story = {
  args: {
    label: "Technique balance",
    size: "small",
    legend: "grid",
    max: 100,
    segments: [
      { label: "Rolls", value: 54 },
      { label: "Diddles", value: 46 },
      { label: "Flams", value: 0 },
      { label: "Drags", value: 0 },
    ],
  },
};

export const MonoDark: Story = {
  ...CustomWhole,
  globals: { theme: "mono", scheme: "dark" },
};

export const SmallInline: Story = {
  args: { size: "small" },
};

export const SingleSegment: Story = {
  args: { segments: [{ label: "Design", value: 0.6 }] },
};

export const Empty: Story = {
  args: {
    segments: [
      { label: "Design", value: 0 },
      { label: "Build", value: 0 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("0% Design")).toBeVisible();
  },
};

export const EqualThirds: Story = {
  args: {
    max: 3,
    segments: [
      { label: "Design", value: 1 },
      { label: "Build", value: 1 },
      { label: "Review", value: 1 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("34% Design")).toBeVisible();
    await expect(canvas.getByText("33% Review")).toBeVisible();
  },
};

export const TinyShare: Story = {
  args: {
    segments: [
      { label: "Design", value: 0.6 },
      { label: "Review", value: 0.004 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("<1% Review")).toBeVisible();
  },
};

export const LongLabels: Story = {
  args: {
    legend: "grid",
    segments: [
      { label: "Design explorations and prototypes", value: 0.38 },
      { label: "Build", value: 0.26 },
      { label: "Review with the accessibility team", value: 0.21 },
    ],
  },
};

export const MoreThanFive: Story = {
  args: {
    label: "Storage",
    max: 256,
    segments: [
      { label: "Photos", value: 96 },
      { label: "Music", value: 48 },
      { label: "Documents", value: 24 },
      { label: "Apps", value: 32 },
      { label: "Mail", value: 12 },
      { label: "Other", value: 16 },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(6);
  },
};

export const RightToLeft: Story = {
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};
