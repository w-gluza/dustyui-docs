import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Callout } from "dustyui";
import styles from "./Card.module.css";

const meta = {
  title: "Components/Callout",
  component: Callout,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "inline-radio", options: ["neutral", "accent"] },
  },
  args: {
    title: "Heat warning",
    children:
      "Summer afternoons pass 45 degrees. Start before sunrise and carry four litres of water per person.",
  },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  play: async ({ canvas }) => {
    const note = canvas.getByRole("note");
    await expect(note).toHaveTextContent("Heat warning");
    await expect(note).toHaveTextContent("four litres of water");
  },
};

export const Accent: Story = {
  args: { tone: "accent", title: "Good to know" },
};

export const WithoutTitle: Story = {
  args: { title: undefined },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("note")).not.toHaveTextContent(
      "Heat warning",
    );
  },
};

export const NeutralDark: Story = {
  ...Neutral,
  globals: { theme: "dusty", scheme: "dark" },
};

export const AccentDark: Story = {
  ...Accent,
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  ...Neutral,
  globals: { theme: "mono", scheme: "light" },
};
