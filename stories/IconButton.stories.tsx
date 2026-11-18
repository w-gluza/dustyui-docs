import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { IconButton } from "dustyui";
import { HeartIcon, PlayIcon } from "./icons";
import styles from "./Button.module.css";

const closeIcon = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "plain"] },
    shape: { control: "select", options: ["rounded", "pill"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    icon: { control: false },
  },
  args: {
    label: "Close",
    icon: closeIcon,
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Plain: Story = {
  args: { variant: "plain" },
};

export const Pill: Story = {
  args: { shape: "pill" },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: "Close" });
    const box = button.getBoundingClientRect();

    await expect(box.width).toBe(box.height);
    await expect(
      Number.parseFloat(getComputedStyle(button).borderTopLeftRadius),
    ).toBeGreaterThanOrEqual(box.height / 2);
  },
};

export const PillPlayButton: Story = {
  args: { shape: "pill", size: "large", label: "Play", icon: <PlayIcon /> },
};

export const Small: Story = {
  args: { size: "small" },
};

export const Large: Story = {
  args: { size: "large" },
};

export const Loading: Story = {
  args: { loading: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Close" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Close" });
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Toggle: Story = {
  args: {
    variant: "plain",
    shape: "pill",
    label: "Favourite",
    icon: <HeartIcon />,
    "aria-pressed": true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Favourite", pressed: true }),
    ).toBeVisible();
  },
};

const VARIANTS = ["primary", "secondary", "plain"] as const;
const SIZES = ["small", "medium", "large"] as const;

function Matrix() {
  return (
    <table className={styles.matrix}>
      <thead>
        <tr>
          <th scope="col">variant</th>
          {SIZES.map((size) => (
            <th key={size} scope="col">
              {size}
            </th>
          ))}
          <th scope="col">pill</th>
          <th scope="col">pressed</th>
          <th scope="col">disabled</th>
          <th scope="col">loading</th>
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((variant) => (
          <tr key={variant}>
            <th scope="row">{variant}</th>
            {SIZES.map((size) => (
              <td key={size}>
                <IconButton
                  label={`Close, ${size}`}
                  icon={closeIcon}
                  variant={variant}
                  size={size}
                />
              </td>
            ))}
            <td>
              <IconButton
                label="Close, pill"
                icon={closeIcon}
                variant={variant}
                shape="pill"
              />
            </td>
            <td>
              <IconButton
                label="Close, pressed"
                icon={closeIcon}
                variant={variant}
                aria-pressed
              />
            </td>
            <td>
              <IconButton
                label="Close, disabled"
                icon={closeIcon}
                variant={variant}
                disabled
              />
            </td>
            <td>
              <IconButton
                label="Close, loading"
                icon={closeIcon}
                variant={variant}
                loading
              />
            </td>
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
      await expect(canvas.getAllByRole("button")).toHaveLength(
        VARIANTS.length * (SIZES.length + 4),
      );
    },
  };
}

export const Variants: Story = matrix("dusty", "light");
export const VariantsDark: Story = matrix("dusty", "dark");
export const VariantsMono: Story = matrix("mono", "light");
export const VariantsMonoDark: Story = matrix("mono", "dark");
