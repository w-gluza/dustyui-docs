import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, waitFor } from "storybook/test";
import { Button } from "dustyui";
import { ArchIcon } from "./icons";
import styles from "./Demo.module.css";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "plain"] },
    iconPosition: { control: "inline-radio", options: ["start", "end"] },
    size: { control: "select", options: ["small", "medium", "large"] },
  },
  args: {
    children: "Save",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: (args) => (
    <div className={styles.avatars}>
      <Button {...args}>Get started</Button>
      <Button
        {...args}
        variant="secondary"
        icon={<ArchIcon />}
        iconPosition="end"
      >
        Learn more
      </Button>
      <Button {...args} variant="plain">
        Cancel
      </Button>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(3);
    await expect(
      canvas.getByRole("button", { name: "Learn more" }),
    ).toBeVisible();
  },
};

export const VariantsDark: Story = {
  ...Variants,
  globals: { theme: "dusty", scheme: "dark" },
};

export const Primary: Story = {
  args: { variant: "primary" },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Plain: Story = {
  args: { variant: "plain", children: "Cancel" },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Cancel" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const WithIcon: Story = {
  args: {
    variant: "secondary",
    children: "Learn more",
    icon: <ArchIcon />,
    iconPosition: "end",
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Learn more" });
    await expect(button.querySelector("svg")).not.toBeNull();
  },
};

export const Small: Story = {
  args: { size: "small" },
};

export const Large: Story = {
  args: { size: "large" },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Save" });
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(button).toBeDisabled();
  },
};

export const Loading: Story = {
  args: { loading: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Save" });
    await userEvent.click(button);
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(button).toHaveFocus();
    await expect(button).toHaveAttribute("aria-disabled", "true");
    await waitFor(() =>
      expect(
        document.querySelector("[data-dusty-announcer]"),
      ).toHaveTextContent("Loading"),
    );
  },
};

export const FocusableWhenUnavailable: Story = {
  args: { "aria-disabled": true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Save" });
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(button).toHaveFocus();
  },
};
