import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";
import { announce, Button, readyAnnouncer } from "dustyui";

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

function SaveButton() {
  useEffect(readyAnnouncer, []);

  return <Button onClick={() => announce("Saved")}>Save</Button>;
}

export const ReadyBeforeTheFirstMessage: Story = {
  render: () => <SaveButton />,
  play: async ({ canvas, userEvent }) => {
    await expect(
      document.querySelector("[data-dusty-announcer] [aria-live='polite']"),
    ).not.toBeNull();

    await userEvent.click(canvas.getByRole("button"));
    await waitFor(() =>
      expect(
        document.querySelector("[data-dusty-announcer] [aria-live='polite']"),
      ).toHaveTextContent("Saved"),
    );
  },
};
