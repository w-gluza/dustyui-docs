import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";
import { announce, Button } from "dustyui";

const meta = {
  title: "Utilities/Announcer",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Polite: Story = {
  render: () => (
    <Button onClick={() => announce("3 unread messages")}>
      Announce unread count
    </Button>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button"));
    await waitFor(() =>
      expect(
        document.querySelector("[data-dusty-announcer] [aria-live='polite']"),
      ).toHaveTextContent("3 unread messages"),
    );
  },
};

export const Assertive: Story = {
  render: () => (
    <Button onClick={() => announce("Connection lost", "assertive")}>
      Announce an error
    </Button>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button"));
    await waitFor(() =>
      expect(
        document.querySelector(
          "[data-dusty-announcer] [aria-live='assertive']",
        ),
      ).toHaveTextContent("Connection lost"),
    );
  },
};
