import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ProgressBar, type ProgressBarProps } from "dustyui";
import { ArrowUpRightIcon } from "./icons";
import styles from "./ProgressBar.module.css";

type PlainProps = Extract<ProgressBarProps, { variant?: "plain" | undefined }>;

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
  },
  args: { label: "Track progress", value: 0.35 },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<PlainProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const bar = canvas.getByRole("progressbar", { name: "Track progress" });

    await expect(bar).toHaveAttribute("value", "0.35");
  },
};

export const WithLabel: Story = {
  args: { label: "Uploading cover", showLabel: true, value: 0.62 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("62%")).toBeVisible();
  },
};

export const CustomValueText: Story = {
  args: {
    label: "Soft Transit",
    showLabel: true,
    value: 78,
    max: 255,
    valueLabel: "1:18 of 4:15",
  },
};

export const Indeterminate: Story = {
  args: { label: "Loading tracks", value: undefined, showLabel: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div className={styles.stack}>
      <ProgressBar {...args} label="Small" size="small" showLabel />
      <ProgressBar {...args} label="Medium" size="medium" showLabel />
      <ProgressBar {...args} label="Large" size="large" showLabel />
    </div>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <div className={styles.stack}>
      <ProgressBar {...args} label="Accent" tone="accent" showLabel />
      <ProgressBar {...args} label="Neutral" tone="neutral" showLabel />
    </div>
  ),
};

export const TonesDark: Story = {
  ...Tones,
  globals: { theme: "dusty", scheme: "dark" },
};

export const TonesMono: Story = {
  ...Tones,
  globals: { theme: "mono", scheme: "light" },
};

export const Editorial: Story = {
  render: () => (
    <ProgressBar
      variant="editorial"
      label="Uploading artwork / 001"
      value={0.62}
      note={<ArrowUpRightIcon className={styles.arrow} />}
      startLabel="Album cover.svg"
      endLabel="In progress"
    />
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("progressbar", { name: "Uploading artwork / 001" }),
    ).toHaveAttribute("value", "0.62");
    await expect(canvas.getByText("In progress")).toBeVisible();
  },
};

export const EditorialWithNote: Story = {
  render: () => (
    <ProgressBar
      variant="editorial"
      label="Current progress / 001"
      value={0.72}
      note="Almost there"
      startLabel="Start"
      endLabel="Finish"
    />
  ),
};

export const EditorialDark: Story = {
  ...Editorial,
  globals: { theme: "dusty", scheme: "dark" },
};

export const EditorialCustomValue: Story = {
  render: () => (
    <ProgressBar
      variant="editorial"
      tone="neutral"
      label="Soft Transit"
      value={78}
      max={255}
      valueLabel="1:18"
      note="of 4:15"
    />
  ),
};

export const Empty: Story = {
  args: { value: 0, showLabel: true },
};

export const Complete: Story = {
  args: { value: 1, showLabel: true },
};

export const LongCaptions: Story = {
  args: {
    label: "A_very_long_unbroken_file_name_for_an_upload.svg",
    showLabel: true,
    value: 78,
    max: 255,
    valueLabel: "1:18 of 4:15",
    startLabel: "A_very_long_unbroken_start_caption_text.svg",
    endLabel: "In progress",
  },
};

export const RightToLeft: Story = {
  args: { showLabel: true, startLabel: "Album cover.svg", endLabel: "62%" },
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};

export const IndeterminateRightToLeft: Story = {
  ...Indeterminate,
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};

export const EditorialIndeterminate: Story = {
  render: () => <ProgressBar variant="editorial" label="Preparing upload" />,
};

export const EditorialMonoDark: Story = {
  ...Editorial,
  globals: { theme: "mono", scheme: "dark" },
};

export const DescribedByCaptions: Story = {
  ...EditorialCustomValue,
  tags: ["!dev"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("progressbar")).toHaveAccessibleDescription(
      /of 4:15/u,
    );
  },
};
