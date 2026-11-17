import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, spyOn } from "storybook/test";
import { CopyButton } from "dustyui";

const meta = {
  title: "Components/CopyButton",
  component: CopyButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "plain"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    shape: { control: "select", options: ["rounded", "pill"] },
  },
  args: {
    value: "npm install dustyui",
    onCopied: fn(),
    onCopyError: fn(),
  },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const IconOnly: Story = {
  args: { iconOnly: true, variant: "plain" },
};

export const CustomLabels: Story = {
  args: { label: "Copy link", copiedLabel: "Link copied", shape: "pill" },
};

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Small: Story = {
  args: { size: "small" },
};

function stubClipboard(succeeds: boolean) {
  return () => {
    const write = spyOn(navigator.clipboard, "writeText");

    if (succeeds) {
      write.mockResolvedValue();
    } else {
      write.mockRejectedValue(new Error("Clipboard unavailable"));
    }
    return () => {
      write.mockRestore();
    };
  };
}

export const Success: Story = {
  beforeEach: stubClipboard(true),
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Copy" }));

    await expect(
      await canvas.findByRole("button", { name: "Copied" }),
    ).toHaveAttribute("data-status", "copied");
    await expect(args.onCopied).toHaveBeenCalledWith("npm install dustyui");
  },
};

export const SuccessDark: Story = {
  ...Success,
  globals: { theme: "dusty", scheme: "dark" },
};

export const Failure: Story = {
  beforeEach: stubClipboard(false),
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Copy" }));

    await expect(
      await canvas.findByRole("button", { name: "Copy failed" }),
    ).toHaveAttribute("data-status", "failed");
    await expect(args.onCopyError).toHaveBeenCalledOnce();
    await expect(args.onCopied).not.toHaveBeenCalled();
  },
};

export const FailureDark: Story = {
  ...Failure,
  globals: { theme: "dusty", scheme: "dark" },
};
