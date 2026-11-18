import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";
import { Button, Card, EmptyState } from "dustyui";
import styles from "./EmptyState.module.css";
import { DesertPortrait } from "./DesertArtwork";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    level: { control: "inline-radio", options: [2, 3, 4, 5, 6] },
  },
  args: {
    title: "No trips planned yet",
    level: 2,
    description:
      "Pick a park and a date, and your first trip will show up here.",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

const onPlan = fn();

export const Illustrated: Story = {
  args: {
    media: <DesertPortrait />,
    actions: (
      <>
        <Button onClick={onPlan}>Plan a trip</Button>
        <Button variant="plain">Browse parks</Button>
      </>
    ),
  },
  play: async ({ canvas, userEvent }) => {
    await expect(
      canvas.getByRole("heading", { level: 2, name: "No trips planned yet" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Plan a trip" }));
    await expect(onPlan).toHaveBeenCalledOnce();
  },
};

export const IllustratedDark: Story = {
  ...Illustrated,
  globals: { theme: "dusty", scheme: "dark" },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(2);
  },
};

export const TextOnly: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("button")).toBeNull();
  },
};

export const WithAction: Story = {
  args: { actions: <Button>Plan a trip</Button> },
};

export const Mono: Story = {
  ...Illustrated,
  globals: { theme: "mono", scheme: "light" },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(2);
  },
};

export const LongCopy: Story = {
  args: {
    title: "You have not planned any trips to a national park this year",
    description:
      "Pick a park and a date, and your first trip will show up here. You can add as many stops as you like, share the plan with the people travelling with you, and change it right up to the morning you leave.",
    actions: <Button>Plan a trip</Button>,
  },
};

export const RichDescription: Story = {
  args: {
    description: (
      <>
        <p>Your first trip will show up here.</p>
        <p>You need a park and a date to start.</p>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("p p")).toBeNull();
  },
};

export const NarrowContainer: Story = {
  ...Illustrated,
  decorators: [(Story) => <div className={styles.narrow}>{Story()}</div>],
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(2);
  },
};

export const InsideACard: Story = {
  args: { actions: <Button variant="secondary">Plan a trip</Button> },
  decorators: [
    (Story) => (
      <Card as="div" className={styles.card}>
        {Story()}
      </Card>
    ),
  ],
};

export const NoSearchResults: Story = {
  args: {
    title: "No parks match \u201Cglacier bay\u201D",
    description: "Check the spelling, or search by state.",
    actions: <Button variant="secondary">Clear search</Button>,
  },
};

export const LoadingFailed: Story = {
  args: {
    title: "Your trips did not load",
    description: "The connection dropped. Your trips are safe.",
    actions: <Button>Try again</Button>,
  },
};
