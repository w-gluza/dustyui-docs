import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { AvatarGroup, Card } from "dustyui";
import { DesertPortrait } from "./DesertArtwork";
import styles from "./AvatarGroup.module.css";

const PEOPLE = [
  { name: "Wioletta Gluza", image: <DesertPortrait /> },
  { name: "Maya Torres" },
  { name: "Leo Park" },
  { name: "Ines Costa" },
  { name: "Tom Becker" },
  { name: "Aiko Sato" },
];

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
  },
  args: {
    label: "Trip members",
    avatars: PEOPLE,
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithOverflow: Story = {
  args: { max: 4 },
  parameters: {
    docs: {
      description: {
        story:
          "`max` is the number of circles, counter included. Six people with `max={4}` show three portraits and a +3 counter, so the group never grows past four circles and a counter never stands for one person.",
      },
    },
  },
  play: async ({ canvas }) => {
    const list = canvas.getByRole("list", { name: "Trip members" });
    await expect(list.children).toHaveLength(4);
    await expect(canvas.getByRole("img", { name: "3 more" })).toHaveTextContent(
      "+3",
    );
  },
};

export const WithOverflowDark: Story = {
  ...WithOverflow,
  globals: { theme: "dusty", scheme: "dark" },
};

export const Everyone: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("img")).toHaveLength(PEOPLE.length);
  },
};

export const Small: Story = {
  args: { size: "small", max: 3 },
};

export const Large: Story = {
  args: { size: "large", max: 3 },
};

export const SmallDark: Story = {
  ...Small,
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  ...WithOverflow,
  globals: { theme: "mono", scheme: "light" },
};

export const MonoDark: Story = {
  ...WithOverflow,
  globals: { theme: "mono", scheme: "dark" },
};

const CROWD = Array.from({ length: 150 }, (_, index) => ({
  name: `Guest ${String(index + 1)}`,
}));

export const LargeCount: Story = {
  args: { avatars: CROWD, max: 4, size: "small" },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("img", { name: "147 more" }),
    ).toHaveTextContent("99+");
  },
};

export const TranslatedCount: Story = {
  args: {
    label: "Uczestnicy",
    max: 4,
    overflowLabel: (count) => `i ${String(count)} innych`,
  },
};

export const OnRaisedSurface: Story = {
  args: { max: 4 },
  decorators: [
    (Story) => (
      <Card as="div" className={styles.raised}>
        {Story()}
      </Card>
    ),
  ],
};

export const RightToLeft: Story = {
  args: { max: 4 },
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};

export const NarrowContainer: Story = {
  decorators: [(Story) => <div className={styles.narrow}>{Story()}</div>],
};
