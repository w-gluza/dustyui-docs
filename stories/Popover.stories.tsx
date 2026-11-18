import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, waitFor } from "storybook/test";
import { Popover, RadioGroup } from "dustyui";

const METERS = ["2/4", "3/4", "4/4", "5/4", "6/8"].map((meter) => ({
  value: meter,
  label: meter,
}));

function MeterMenu({ align }: { align?: "start" | "end" }) {
  const [meter, setMeter] = useState("4/4");

  return (
    <Popover
      trigger={meter}
      triggerLabel={`Time signature, ${meter}`}
      align={align}
      closeOnSelect
    >
      <RadioGroup
        legend="Time signature"
        legendHidden
        options={METERS}
        value={meter}
        onValueChange={setMeter}
      />
    </Popover>
  );
}

const meta = {
  title: "Components/Popover",
  component: MeterMenu,
  parameters: { layout: "centered" },
} satisfies Meta<typeof MeterMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: "Time signature, 4/4" }),
    );
    await expect(
      await canvas.findByRole("radio", { name: "4/4" }),
    ).toBeChecked();

    await userEvent.click(canvas.getByRole("radio", { name: "6/8" }));

    await expect(
      canvas.getByRole("button", { name: "Time signature, 6/8" }),
    ).toHaveAttribute("aria-expanded", "false");
  },
};

export const Open: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(
      await canvas.findByRole("radio", { name: "4/4" }),
    ).toBeChecked();
    await waitFor(() => expect(canvas.getByText("6/8")).toBeVisible());
  },
};

export const OpenDark: Story = {
  ...Open,
  globals: { theme: "dusty", scheme: "dark" },
};

export const AlignedToEnd: Story = {
  ...Open,
  args: { align: "end" },
};

export const Closed: Story = {};

export const RightToLeft: Story = {
  ...Open,
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};

export const Mono: Story = {
  ...Open,
  globals: { theme: "mono", scheme: "light" },
};

const openOptions: Story["play"] = async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole("button", { name: "Options" }));
};

export const NamedPanel: Story = {
  render: () => (
    <Popover trigger="Options" role="group" aria-label="Display options">
      <p style={{ margin: 0, padding: "0.75rem 1rem" }}>
        Pass a role and an accessible name to give the panel a boundary.
      </p>
    </Popover>
  ),
  play: async (context) => {
    await openOptions(context);
    const panel = await context.canvas.findByRole("group", {
      name: "Display options",
    });

    await waitFor(() => expect(panel).toBeVisible());
  },
};

export const WithoutChevron: Story = {
  render: () => (
    <Popover trigger="Options" chevron={false}>
      <p style={{ margin: 0, padding: "0.75rem 1rem" }}>No chevron.</p>
    </Popover>
  ),
};

export const StaysOpenAfterChoice: Story = {
  render: () => (
    <Popover trigger="Options">
      <RadioGroup
        legend="Time signature"
        legendHidden
        options={METERS}
        defaultValue="4/4"
      />
    </Popover>
  ),
  play: async (context) => {
    await openOptions(context);
    await context.userEvent.click(
      await context.canvas.findByRole("radio", { name: "6/8" }),
    );
    await expect(
      context.canvas.getByRole("button", { name: "Options" }),
    ).toHaveAttribute("aria-expanded", "true");
  },
};

export const LongList: Story = {
  render: () => (
    <Popover trigger="Options">
      <RadioGroup
        legend="Tempo"
        legendHidden
        options={Array.from({ length: 60 }, (_, index) => {
          const tempo = String(40 + index * 4);

          return { value: tempo, label: `${tempo} BPM` };
        })}
        defaultValue="120"
      />
    </Popover>
  ),
  play: async (context) => {
    await openOptions(context);
    const panel = (
      await context.canvas.findByRole("group", {
        name: "Tempo",
      })
    ).closest("[popover]") as HTMLElement;

    await waitFor(() =>
      expect(panel.scrollHeight).toBeGreaterThan(panel.clientHeight),
    );
  },
};
