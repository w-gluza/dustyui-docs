import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Insights } from "./Insights";

const meta = {
  title: "Showcase/Insights",
  component: Insights,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Insights>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: { theme: "dusty", scheme: "dark" },
  play: async ({ canvas, userEvent }) => {
    const balance = canvas.getByRole("list", { name: "Technique balance" });

    await expect(balance).toHaveTextContent("Rolls38%");
    await expect(
      canvas.getByRole("progressbar", { name: "Getting into rhythm" }),
    ).toHaveAttribute("aria-valuetext", "18 of 50");

    await userEvent.click(
      canvas.getByRole("button", { name: "Period, This month" }),
    );
    await userEvent.click(
      await canvas.findByRole("radio", { name: "This week" }),
    );

    await expect(balance).toHaveTextContent("Rolls54%");
    await expect(
      canvas.getByRole("button", { name: "Period, This week" }),
    ).toHaveAttribute("aria-expanded", "false");
  },
};

export const Light: Story = {
  globals: { theme: "dusty", scheme: "light" },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};
