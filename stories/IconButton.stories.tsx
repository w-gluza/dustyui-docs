import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { IconButton } from "dustyui";
import { PlayIcon } from "./icons";

const closeIcon = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "plain"] },
    shape: { control: "select", options: ["rounded", "pill"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    icon: { control: false },
  },
  args: {
    label: "Close",
    icon: closeIcon,
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Plain: Story = {
  args: { variant: "plain" },
};

export const Round: Story = {
  args: { shape: "pill" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Close" });
    const box = button.getBoundingClientRect();

    await expect(box.width).toBe(box.height);
    await expect(
      Number.parseFloat(getComputedStyle(button).borderTopLeftRadius),
    ).toBeGreaterThanOrEqual(box.height / 2);
  },
};

export const RoundPlayButton: Story = {
  args: { shape: "pill", size: "large", label: "Play", icon: <PlayIcon /> },
};

export const Small: Story = {
  args: { size: "small" },
};

export const Large: Story = {
  args: { size: "large" },
};

export const Loading: Story = {
  args: { loading: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Close" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  },
};
