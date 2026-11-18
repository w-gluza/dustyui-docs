import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { MilestoneProgress } from "dustyui";
import styles from "./MilestoneProgress.module.css";

const meta = {
  title: "Components/MilestoneProgress",
  component: MilestoneProgress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    completed: { control: { type: "number", min: 0, max: 4, step: 1 } },
    progress: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
  },
  args: {
    label: "Onboarding",
    milestones: ["Setup", "Design", "Build", "Ship"],
    completed: 2,
    progress: 0.4,
  },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<typeof MilestoneProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole("listitem");

    await expect(items[1]).toHaveTextContent("Design, completed");
    await expect(items[2]).toHaveAttribute("aria-current", "step");
  },
};

export const Dark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};

export const NotStarted: Story = {
  args: { completed: 0, progress: 0 },
};

export const Finished: Story = {
  args: { completed: 4 },
};

export const MonoDark: Story = {
  globals: { theme: "mono", scheme: "dark" },
};

export const BetweenSteps: Story = {
  args: { completed: 2, progress: 0 },
};

export const WithProgressLabel: Story = {
  args: { progressLabel: "40% done" },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")[2]).toHaveTextContent(
      "Build, 40% done",
    );
  },
};

const DELIVERY = [
  "Requirements",
  "Design",
  "Implementation",
  "Review",
  "Testing",
  "Release",
];

export const SixMilestones: Story = {
  args: { milestones: DELIVERY, completed: 3 },
  argTypes: { completed: { control: { type: "number", min: 0, max: 6 } } },
  decorators: [(Story) => <div className={styles.wide}>{Story()}</div>],
};

export const LongLabels: Story = {
  args: {
    milestones: [
      "Set up your account",
      "Design the first screen",
      "Build and test",
      "Ship to everyone",
    ],
  },
};

export const NarrowContainer: Story = {
  args: { milestones: DELIVERY, completed: 3 },
  decorators: [(Story) => <div className={styles.narrow}>{Story()}</div>],
};

export const RightToLeft: Story = {
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};
