import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { ObjectInspector } from "dustyui";

const park = {
  name: "Yellowstone",
  established: 1872,
  open: true,
  location: { lat: 44.6, lng: -110.5 },
  animals: [
    {
      commonName: "American bison",
      scientificName: "Bison bison",
      count: 4800,
    },
    { commonName: "Grey wolf", scientificName: "Canis lupus", count: 108 },
  ],
};

class Sighting {
  species = "Bison bison";
  groupSize = 24;
}

function everyKind() {
  return {
    text: "Old Faithful",
    count: 42,
    big: BigInt("9007199254740993"),
    flag: false,
    nothing: null,
    missing: undefined,
    id: Symbol("park"),
    when: new Date("2026-11-14T10:00:00.000Z"),
    pattern: /bison|wolf/giu,
    failure: new RangeError("count out of range"),
    greet(name: string) {
      return `Hello ${name}`;
    },
    Sighting,
    sighting: new Sighting(),
    tags: new Set(["geyser", "wildlife"]),
    visitors: new Map([
      [2024, 4_744_353],
      [2025, 4_501_382],
    ]),
    bytes: new Uint8Array([1, 2, 3]),
  };
}

function tricky() {
  const value: Record<string, unknown> = {
    get expensive() {
      return 1;
    },
    refuses: new Proxy(
      {},
      {
        ownKeys() {
          throw new Error("this object refuses to be read");
        },
      },
    ),
  };
  value.self = value;
  return value;
}

const meta = {
  title: "Components/ObjectInspector",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Park: Story = {
  render: () => <ObjectInspector label="Park" value={park} />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await userEvent.keyboard("l{ArrowRight}");
    await expect(canvas.getByRole("treeitem", { name: /^lat/u })).toBeVisible();
  },
};

export const EveryKind: Story = {
  render: () => (
    <ObjectInspector label="Every kind of value" value={everyKind()} />
  ),
};

export const Tricky: Story = {
  render: () => <ObjectInspector label="Tricky values" value={tricky()} />,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("treeitem", { name: /Circular/u }),
    ).toBeVisible();
  },
};

export const Primitive: Story = {
  render: () => <ObjectInspector label="Answer" value={42} />,
};

export const StartsClosed: Story = {
  render: () => (
    <ObjectInspector label="Park" value={park} defaultExpanded={[]} />
  ),
};
