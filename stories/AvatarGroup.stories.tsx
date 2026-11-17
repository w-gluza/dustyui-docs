import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { AvatarGroup } from "dustyui";
import { DesertPortrait } from "./DesertArtwork";

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
  play: async ({ canvas }) => {
    const list = canvas.getByRole("list", { name: "Trip members" });
    await expect(list.children).toHaveLength(5);
    await expect(canvas.getByRole("img", { name: "2 more" })).toHaveTextContent(
      "+2",
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
