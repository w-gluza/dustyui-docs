import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { Button, EmptyState } from "dustyui";
import { DesertPortrait } from "./DesertArtwork";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    level: { control: "inline-radio", options: [2, 3, 4, 5, 6] },
  },
  args: {
    title: "No trips planned yet",
    level: 2,
    description:
      "Pick a park and a date, and your first trip will show up here.",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

const onPlan = fn();

export const Illustrated: Story = {
  args: {
    media: <DesertPortrait />,
    actions: (
      <>
        <Button onClick={onPlan}>Plan a trip</Button>
        <Button variant="plain">Browse parks</Button>
      </>
    ),
  },
  play: async ({ canvas, userEvent }) => {
    await expect(
      canvas.getByRole("heading", { level: 2, name: "No trips planned yet" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Plan a trip" }));
    await expect(onPlan).toHaveBeenCalledOnce();
  },
};

export const IllustratedDark: Story = {
  ...Illustrated,
  globals: { theme: "dusty", scheme: "dark" },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(2);
  },
};

export const TextOnly: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("button")).toBeNull();
  },
};

export const WithAction: Story = {
  args: { actions: <Button>Plan a trip</Button> },
};
