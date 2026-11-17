import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { AccountTabs } from "./TabsExample";
import styles from "./Tabs.module.css";

const meta = {
  title: "Components/Tabs",
  component: AccountTabs,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["connected", "underline", "pill"],
    },
    activation: { control: "inline-radio", options: ["automatic", "manual"] },
  },
  args: { onValueChange: fn() },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<typeof AccountTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultDark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const Underline: Story = {
  args: { variant: "underline" },
};

export const Pill: Story = {
  args: { variant: "pill" },
};

export const Controlled: Story = {
  render: function ControlledTabs(args) {
    const [value, setValue] = useState("activity");

    return (
      <>
        <p className={styles.status}>Selected: {value}</p>
        <AccountTabs
          {...args}
          value={value}
          onValueChange={(next) => {
            setValue(next);
            args.onValueChange?.(next);
          }}
        />
      </>
    );
  },
};

export const ManualActivation: Story = {
  args: { activation: "manual" },
};

export const DisabledTabs: Story = {
  args: { disabledTab: "activity" },
};

export const DifferentLabelLengths: Story = {
  args: {
    labels: {
      overview: "Plan",
      activity: "Recent account activity",
      settings: "Alerts",
    },
  },
};

export const ResponsiveLayout: Story = {
  args: {
    labels: {
      overview: "Plan and storage",
      activity: "Recent activity",
      settings: "Notifications",
    },
  },
  decorators: [(Story) => <div className={styles.narrow}>{Story()}</div>],
};

export const AllVariants: Story = {
  render: (args) => (
    <div className={styles.stack}>
      {(["connected", "underline", "pill"] as const).map((variant) => (
        <div key={variant}>
          <p className={styles.caption}>{variant}</p>
          <AccountTabs {...args} variant={variant} />
        </div>
      ))}
    </div>
  ),
  decorators: [(Story) => Story()],
};

export const AllVariantsDark: Story = {
  ...AllVariants,
  globals: { theme: "dusty", scheme: "dark" },
};

export const Interactions: Story = {
  tags: ["!dev"],
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("tab", { name: "Overview" }));
    await userEvent.keyboard("{ArrowRight}");

    await expect(canvas.getByRole("tab", { name: "Activity" })).toHaveFocus();
    await expect(
      canvas.getByRole("tabpanel", { name: "Activity" }),
    ).toBeVisible();
    await expect(args.onValueChange).toHaveBeenCalledWith("activity");

    await userEvent.keyboard("{End}");

    await expect(canvas.getByRole("tab", { name: "Settings" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  },
};

export const ManualInteractions: Story = {
  tags: ["!dev"],
  args: { activation: "manual" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("tab", { name: "Overview" }));
    await userEvent.keyboard("{ArrowRight}");

    await expect(
      canvas.getByRole("tabpanel", { name: "Overview" }),
    ).toBeVisible();

    await userEvent.keyboard("{Enter}");

    await expect(
      canvas.getByRole("tabpanel", { name: "Activity" }),
    ).toBeVisible();
  },
};

export const DisabledInteractions: Story = {
  tags: ["!dev"],
  args: { disabledTab: "activity" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("tab", { name: "Overview" }));
    await userEvent.keyboard("{ArrowRight}");

    await expect(canvas.getByRole("tab", { name: "Settings" })).toHaveFocus();
  },
};
