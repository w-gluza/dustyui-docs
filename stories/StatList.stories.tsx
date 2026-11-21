import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Badge, StatList } from "dustyui";
import { CalendarIcon, ClockIcon, HistoryIcon } from "./icons";

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
  decorators: [
    (Story) => (
      <div style={{ inlineSize: "min(22rem, calc(100vw - 2rem))" }}>
        {Story()}
      </div>
    ),
  ],
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
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Today")).toBeVisible();
  },
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

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};

export const LongContent: Story = {
  args: {
    stats: [
      {
        label: "Primary contact address for billing and invoices",
        value: "a.very.long.address@an-unbroken-example-domain.example",
        icon: <ClockIcon />,
      },
      { label: "Checksum", value: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b" },
    ],
  },
};

export const MixedIcons: Story = {
  args: {
    stats: [
      { label: "Total practice time", value: "4h 12m", icon: <ClockIcon /> },
      { label: "Total sessions", value: 18 },
      { label: "Last practised", value: "Today", icon: <HistoryIcon /> },
    ],
  },
};

export const RichValue: Story = {
  args: {
    stats: [
      { label: "Status", value: <Badge label="Active" /> },
      { label: "Plan", value: "Studio" },
    ],
  },
};

export const SingleStat: Story = {
  args: { stats: [{ label: "Tracks", value: 9 }] },
};

export const Empty: Story = {
  args: { stats: [] },
};

export const RightToLeft: Story = {
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};
