import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Avatar } from "dustyui";

const placeholderPortrait =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23bbb'/%3E%3Ccircle cx='32' cy='26' r='12' fill='%23444'/%3E%3Cellipse cx='32' cy='60' rx='22' ry='18' fill='%23444'/%3E%3C/svg%3E";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    name: "Wioletta Gluza",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  play: async ({ canvas }) => {
    const avatar = canvas.getByRole("img", { name: "Wioletta Gluza" });
    await expect(avatar).toHaveTextContent("WG");
  },
};

export const CustomFallback: Story = {
  args: { fallback: "W" },
};

export const Small: Story = {
  args: { size: 32 },
};

export const Large: Story = {
  args: { size: 96 },
};

export const WithImage: Story = {
  args: {
    image: <img alt="" src={placeholderPortrait} />,
  },
};

export const Decorative: Story = {
  args: { decorative: true },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("img")).toBeNull();
  },
};
