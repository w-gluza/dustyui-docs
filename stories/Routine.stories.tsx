import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Routine } from "./Routine";

const meta = {
  title: "Showcase/Routine",
  component: Routine,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Routine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: { theme: "dusty", scheme: "dark" },
  play: async ({ canvas }) => {
    const list = canvas.getByRole("list", { name: "Quick Warm-up exercises" });

    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
    await expect(list).toHaveTextContent("Single Stroke Roll");
    await expect(canvas.getByText("10 min · Lvl 1")).toBeVisible();
  },
};

export const Light: Story = {
  globals: { theme: "dusty", scheme: "light" },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};
