import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Callout } from "dustyui";
import styles from "./Card.module.css";
import callout from "./Callout.module.css";

const meta = {
  title: "Components/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A static note beside the main content. It is not an alert: it has no urgent tone and is not announced when it appears.",
      },
    },
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["neutral", "accent"] },
  },
  args: {
    title: "Best time to visit",
    children:
      "The light is softest in the first hour after sunrise. The viewpoints are quiet then, and the sandstone turns deep red.",
  },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  play: async ({ canvas }) => {
    const note = canvas.getByRole("note");
    await expect(note).toHaveAccessibleName("Best time to visit");
    await expect(note).toHaveTextContent("first hour after sunrise");
  },
};

export const Accent: Story = {
  args: { tone: "accent", title: "Good to know" },
};

export const WithoutTitle: Story = {
  args: { title: undefined },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("note")).not.toHaveTextContent(
      "Best time to visit",
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

export const AccentMono: Story = {
  ...Accent,
  globals: { theme: "mono", scheme: "light" },
};

export const MonoDark: Story = {
  ...Neutral,
  globals: { theme: "mono", scheme: "dark" },
};

export const RichContent: Story = {
  args: {
    title: "Before you set off",
    children: (
      <>
        <p>Three things make the day easier:</p>
        <ul>
          <li>Water, four litres each</li>
          <li>
            A paper map, or the <a href="#offline">offline map</a>
          </li>
          <li>
            The gate code, sent as <code>GATE-2026</code>
          </li>
        </ul>
      </>
    ),
  },
};

export const NarrowContainer: Story = {
  decorators: [(Story) => <div className={callout.narrow}>{Story()}</div>],
};

export const RightToLeft: Story = {
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};
