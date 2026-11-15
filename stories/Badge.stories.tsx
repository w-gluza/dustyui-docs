import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Badge } from "dustyui";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    iconPosition: { control: "inline-radio", options: ["start", "end"] },
  },
  args: {
    label: "New",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const label = canvas.getByText("New");
    await expect(label.parentElement?.children).toHaveLength(1);
  },
};

export const IconStart: Story = {
  args: { icon: "★", iconPosition: "start" },
  play: async ({ canvas }) => {
    const icon = canvas.getByText("★");
    await expect(icon).toHaveAttribute("aria-hidden", "true");
    await expect(icon.nextElementSibling).toHaveTextContent("New");
  },
};

export const IconEnd: Story = {
  args: { icon: "★", iconPosition: "end" },
  play: async ({ canvas }) => {
    const icon = canvas.getByText("★");
    await expect(icon).toHaveAttribute("aria-hidden", "true");
    await expect(icon.previousElementSibling).toHaveTextContent("New");
  },
};
