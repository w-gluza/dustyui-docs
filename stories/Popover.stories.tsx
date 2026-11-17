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
