import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "dustyui";

const placeholderPortrait =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23bbb'/%3E%3Ccircle cx='32' cy='26' r='12' fill='%23444'/%3E%3Cellipse cx='32' cy='60' rx='22' ry='18' fill='%23444'/%3E%3C/svg%3E";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    role: "img",
    "aria-label": "Wioletta Gluza",
    fallback: "WG",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {};

export const Small: Story = {
  args: { size: 32 },
};

export const Large: Story = {
  args: { size: 96 },
};

export const WithImage: Story = {
  args: {
    role: undefined,
    "aria-label": undefined,
    image: <img alt="Wioletta Gluza" src={placeholderPortrait} />,
  },
};
