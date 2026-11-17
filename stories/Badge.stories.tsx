import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Badge } from "dustyui";
import { DotIcon, SparkleIcon, StarIcon } from "./icons";
import styles from "./Badge.module.css";

const VARIANTS = ["outline", "soft", "solid", "editorial"] as const;
const TONES = ["neutral", "accent"] as const;

function Matrix() {
  return (
    <table className={styles.matrix}>
      <thead>
        <tr>
          <th scope="col">tone</th>
          {VARIANTS.map((variant) => (
            <th key={variant} scope="col">
              {variant}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TONES.map((tone) => (
          <tr key={tone}>
            <th scope="row">{tone}</th>
            {VARIANTS.map((variant) => (
              <td key={variant}>
                {variant === "editorial" ? (
                  <Badge label="New" variant={variant} tone={tone} />
                ) : (
                  <Badge
                    label="New"
                    icon={<SparkleIcon />}
                    variant={variant}
                    tone={tone}
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function matrix(theme: string, scheme: string): Story {
  return {
    globals: { theme, scheme },
    render: () => <Matrix />,
    play: async ({ canvas }) => {
      await expect(canvas.getAllByText("New")).toHaveLength(
        VARIANTS.length * TONES.length,
      );
    },
  };
}

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: VARIANTS },
    tone: { control: "inline-radio", options: TONES },
    iconPosition: { control: "inline-radio", options: ["start", "end"] },
  },
  args: {
    label: "New",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = matrix("dusty", "light");
export const VariantsDark: Story = matrix("dusty", "dark");
export const VariantsMono: Story = matrix("mono", "light");
export const VariantsMonoDark: Story = matrix("mono", "dark");

export const Soft: Story = {
  args: { variant: "soft", tone: "accent", icon: <SparkleIcon /> },
};

export const Solid: Story = {
  args: { variant: "solid", label: "Featured", icon: <StarIcon /> },
};

export const Editorial: Story = {
  args: { variant: "editorial" },
  play: async ({ canvas }) => {
    const badge = canvas.getByText("New").parentElement;
    await expect(badge && getComputedStyle(badge).textTransform).toBe(
      "uppercase",
    );
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    tone: "accent",
    label: "Active",
    icon: <DotIcon />,
  },
};

export const Default: Story = {
  play: async ({ canvas }) => {
    const label = canvas.getByText("New");
    await expect(label.parentElement?.children).toHaveLength(1);
  },
};

export const IconStart: Story = {
  args: { icon: <SparkleIcon />, iconPosition: "start" },
  play: async ({ canvas }) => {
    const icon = canvas.getByText("New").previousElementSibling;
    await expect(icon).toHaveAttribute("aria-hidden", "true");
    await expect(icon?.querySelector("svg")).not.toBeNull();
  },
};

export const IconEnd: Story = {
  args: { icon: <SparkleIcon />, iconPosition: "end" },
  play: async ({ canvas }) => {
    const icon = canvas.getByText("New").nextElementSibling;
    await expect(icon).toHaveAttribute("aria-hidden", "true");
    await expect(icon?.querySelector("svg")).not.toBeNull();
  },
};
