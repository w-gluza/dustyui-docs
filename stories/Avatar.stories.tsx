import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";
import { Avatar } from "dustyui";
import { DesertPortrait } from "./DesertArtwork";
import styles from "./Demo.module.css";

const placeholderPortrait =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23bbb'/%3E%3Ccircle cx='32' cy='26' r='12' fill='%23444'/%3E%3Cellipse cx='32' cy='60' rx='22' ry='18' fill='%23444'/%3E%3C/svg%3E";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    ring: { control: "select", options: [undefined, "neutral", "accent"] },
  },
  args: {
    name: "Wioletta Gluza",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RingSizes: Story = {
  render: (args) => (
    <div className={styles.avatars}>
      <Avatar {...args} size={128} ring="neutral" image={<DesertPortrait />} />
      <Avatar {...args} size={96} ring="accent" image={<DesertPortrait />} />
      <Avatar {...args} size={64} ring="neutral" image={<DesertPortrait />} />
    </div>
  ),
  play: async ({ canvas }) => {
    const widths = canvas
      .getAllByRole("img", { name: "Wioletta Gluza" })
      .map((avatar) => avatar.getBoundingClientRect().width);
    await expect(widths).toEqual([128, 96, 64]);
  },
};

export const NeutralRing: Story = {
  args: { ring: "neutral", image: <DesertPortrait /> },
  play: async ({ canvas }) => {
    const avatar = canvas.getByRole("img", { name: "Wioletta Gluza" });
    const { width, height } = avatar.getBoundingClientRect();
    await expect([width, height]).toEqual([64, 64]);
    await expect(getComputedStyle(avatar).borderTopWidth).toBe("1px");
  },
};

export const AccentRing: Story = {
  args: { ring: "accent", image: <DesertPortrait /> },
  play: async ({ canvas }) => {
    const avatar = canvas.getByRole("img", { name: "Wioletta Gluza" });
    const { width, height } = avatar.getBoundingClientRect();
    await expect([width, height]).toEqual([64, 64]);
    await expect(
      Number.parseFloat(getComputedStyle(avatar).borderTopWidth),
    ).toBeGreaterThan(1);
  },
};

export const Initials: Story = {
  play: async ({ canvas }) => {
    const avatar = canvas.getByRole("img", { name: "Wioletta Gluza" });
    await expect(avatar).toHaveTextContent("WG");
  },
};

export const CustomFallback: Story = {
  args: { fallback: "W" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img")).toHaveTextContent("W");
  },
};

export const Small: Story = {
  args: { size: "small" },
  play: async ({ canvas }) => {
    const { width, height } = canvas.getByRole("img").getBoundingClientRect();
    await expect([width, height]).toEqual([32, 32]);
  },
};

export const Medium: Story = {
  args: { size: "medium" },
  play: async ({ canvas }) => {
    const { width, height } = canvas.getByRole("img").getBoundingClientRect();
    await expect([width, height]).toEqual([48, 48]);
  },
};

export const Large: Story = {
  args: { size: "large" },
  play: async ({ canvas }) => {
    const { width, height } = canvas.getByRole("img").getBoundingClientRect();
    await expect([width, height]).toEqual([64, 64]);
  },
};

export const SizeInPixels: Story = {
  args: { size: 96 },
  play: async ({ canvas }) => {
    const { width, height } = canvas.getByRole("img").getBoundingClientRect();
    await expect([width, height]).toEqual([96, 96]);
  },
};

export const WithImage: Story = {
  args: {
    image: <img alt="" src={placeholderPortrait} />,
  },
  play: async ({ canvas }) => {
    const avatar = canvas.getByRole("img", { name: "Wioletta Gluza" });
    await expect(avatar.querySelector("img")).toHaveAttribute("alt", "");
    await expect(avatar).toHaveTextContent("WG");
  },
};

export const BrokenImage: Story = {
  args: { image: <img alt="" src="/missing-portrait.png" /> },
  parameters: {
    docs: {
      description: {
        story:
          "An image that fails to load is hidden, so the initials show instead of a broken-image icon.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const image = canvasElement.querySelector("img");
    await waitFor(() =>
      expect(image && getComputedStyle(image).visibility).toBe("hidden"),
    );
  },
};

export const Decorative: Story = {
  args: { decorative: true },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("img")).toBeNull();
  },
};

export const Matrix: Story = {
  render: (args) => (
    <div className={styles.avatars}>
      <Avatar {...args} size="small" />
      <Avatar {...args} size="medium" ring="neutral" />
      <Avatar {...args} size="large" ring="accent" />
      <Avatar {...args} name="Madonna" size="medium" />
      <Avatar {...args} name="Team" fallback="+100" size="small" />
      <Avatar {...args} size="small" ring="accent" image={<DesertPortrait />} />
      <Avatar {...args} size="large" image={<DesertPortrait />} />
    </div>
  ),
};

export const MatrixDark: Story = {
  ...Matrix,
  globals: { theme: "dusty", scheme: "dark" },
};

export const MatrixMono: Story = {
  ...Matrix,
  globals: { theme: "mono", scheme: "light" },
};

export const MatrixMonoDark: Story = {
  ...Matrix,
  globals: { theme: "mono", scheme: "dark" },
};
