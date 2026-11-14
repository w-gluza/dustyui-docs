import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "dustyui";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    iconPosition: { control: "inline-radio", options: ["left", "right"] },
  },
  args: {
    label: "New",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IconLeft: Story = {
  args: { icon: "★", iconPosition: "left" },
};

export const IconRight: Story = {
  args: { icon: "★", iconPosition: "right" },
};
