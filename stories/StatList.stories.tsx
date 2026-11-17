import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { StatList } from "dustyui";
import { CalendarIcon, ClockIcon, HistoryIcon } from "./icons";
import styles from "./ProgressBar.module.css";

const meta = {
  title: "Components/StatList",
  component: StatList,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    stats: [
      { label: "Total practice time", value: "4h 12m", icon: <ClockIcon /> },
      { label: "Total sessions", value: 18, icon: <CalendarIcon /> },
      { label: "Last practised", value: "Today", icon: <HistoryIcon /> },
    ],
  },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<typeof StatList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("term")).toHaveLength(3);
    await expect(canvas.getByText("4h 12m")).toBeVisible();
  },
};

export const Dark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const WithoutIcons: Story = {
  args: {
    stats: [
      { label: "Tracks", value: 9 },
      { label: "Length", value: "38 min" },
      { label: "Released", value: 2026 },
    ],
  },
};
