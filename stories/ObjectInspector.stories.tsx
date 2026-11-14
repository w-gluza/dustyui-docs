import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { useState } from "react";
import { Button, ObjectInspector } from "dustyui";
import {
  createAdvancedParks,
  createMediumParks,
  smallPark,
} from "./data/nationalParks";
import { createEveryKind, createTricky } from "./data/values";
import { Demo } from "./Demo";
import styles from "./Demo.module.css";

const description = `
Shows any JavaScript value as a tree you can open and close.

\`\`\`tsx
import { ObjectInspector } from "dustyui";

<ObjectInspector label="Response" value={data} />
\`\`\`

\`label\` is required and names the tree for screen readers. The value opens one level deep by default.

To control which rows are open, pass \`expanded\` and \`onExpandedChange\`. Rows are identified by path, such as \`$/.parks/[0]\`, so they stay open when the value is replaced.

It is keyboard operable in the same way as Tree.

**Limitations**

- Getters are shown but never run.
- Only an object's own properties are listed; inherited getters and methods are not.
- Types without special handling, such as Promise or WeakMap, show their name only.
- Every visible row is rendered, so very large lists are slow to open.
`;

const meta = {
  title: "Components/ObjectInspector",
  component: ObjectInspector,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "The value to show. Anything is accepted.",
      control: false,
      table: { type: { summary: "unknown" } },
      type: { name: "other", value: "", required: true },
    },
    label: {
      description: "Names the tree for screen readers.",
      control: false,
      table: { type: { summary: "string" } },
      type: { name: "other", value: "", required: true },
    },
    expanded: {
      description:
        "The ids of the open rows. Pass it to control expansion yourself.",
      control: false,
      table: { type: { summary: "ReadonlySet<string>" } },
    },
    defaultExpanded: {
      description:
        "The ids of the rows that start open, when expansion is not controlled.",
      control: false,
      table: {
        type: { summary: "Iterable<string>" },
        defaultValue: { summary: '["$"]' },
      },
    },
    onExpandedChange: {
      description:
        "Called with the new set of open rows whenever one opens or closes.",
      control: false,
      table: { type: { summary: "(expanded: ReadonlySet<string>) => void" } },
    },
  },
  parameters: {
    layout: "padded",
    docs: { description: { component: description } },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Small: Story = {
  render: () => (
    <Demo
      title="Small: one park"
      testing="The basics on a plain object: text, numbers, a true or false value and a short list."
    >
      <ObjectInspector label="Torres del Paine" value={smallPark} />
    </Demo>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await userEvent.keyboard("a{ArrowRight}");
    await expect(
      canvas.getByRole("treeitem", { name: /Guanaco/u }),
    ).toBeVisible();
  },
};

const mediumParks = createMediumParks();

export const Medium: Story = {
  render: () => (
    <Demo
      title="Medium: national parks of the world"
      testing="Deep nesting on data shaped like a typical API response: continents, then countries, then parks, then animals, plus an empty list for Antarctica."
    >
      <ObjectInspector
        label="National parks of the world"
        value={mediumParks}
        defaultExpanded={["$", "$/.continents"]}
      />
    </Demo>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("treeitem", { name: /Antarctica/u }),
    ).toBeVisible();
  },
};

const advancedParks = createAdvancedParks();

export const Advanced: Story = {
  render: () => (
    <Demo
      title="Advanced: world parks ranger system"
      testing="Every supported data type in one realistic object: class instances, dates, maps, sets, typed arrays, big integers, symbols, errors, functions, getters that are not run, and parks that point back to their country (circular references). It also holds 1,890 sightings to test longer lists."
    >
      <ObjectInspector
        label="World parks ranger system"
        value={advancedParks}
        defaultExpanded={["$", "$/.index", "$/.index/.oldest"]}
      />
    </Demo>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("treeitem", { name: /^ageInYears/u }),
    ).toHaveTextContent("(...)");
    await expect(
      canvas.getByRole("treeitem", { name: /^name:\s*"Yellowstone"/u }),
    ).toBeVisible();
  },
};

export const EveryKind: Story = {
  render: () => (
    <Demo title="Every kind of value" testing="One row per data type.">
      <ObjectInspector label="Every kind of value" value={createEveryKind()} />
    </Demo>
  ),
};

export const Tricky: Story = {
  render: () => (
    <Demo
      title="Tricky values"
      testing="Values that break naive inspectors: a getter that must not be run, an object that contains itself, and an object that refuses to be read."
    >
      <ObjectInspector label="Tricky values" value={createTricky()} />
    </Demo>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("treeitem", { name: /^expensive/u }),
    ).toHaveTextContent("(...)");
    await expect(
      canvas.getByRole("treeitem", { name: /^self/u }),
    ).toHaveTextContent("[Circular $]");
    await expect(
      canvas.getByRole("treeitem", { name: /^refuses/u }),
    ).toHaveTextContent("Uninspectable: this object refuses to be read");
  },
};

export const Primitive: Story = {
  render: () => (
    <Demo title="A single value" testing="A value with nothing inside it.">
      <ObjectInspector label="Answer" value={42} />
    </Demo>
  ),
  play: async ({ canvas }) => {
    const rows = canvas.getAllByRole("treeitem");
    await expect(rows).toHaveLength(1);
    await expect(rows[0]).not.toHaveAttribute("aria-expanded");
  },
};

function ControlledExample() {
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set(["$"]));
  return (
    <Demo
      title="Controlled expansion"
      testing="The parent decides which rows are open, through expanded and onExpandedChange."
    >
      <div className={styles.actions}>
        <Button
          variant="secondary"
          onClick={() => setExpanded(new Set(["$", "$/.animals"]))}
        >
          Open animals
        </Button>
        <Button variant="secondary" onClick={() => setExpanded(new Set())}>
          Close all
        </Button>
      </div>
      <ObjectInspector
        label="Torres del Paine"
        value={smallPark}
        expanded={expanded}
        onExpandedChange={setExpanded}
      />
    </Demo>
  );
}

export const ControlledExpansion: Story = {
  render: () => <ControlledExample />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open animals" }));
    await expect(
      canvas.getByRole("treeitem", { name: /Guanaco/u }),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Close all" }));
    await expect(canvas.getAllByRole("treeitem")).toHaveLength(1);
  },
};

const readings = [
  { park: "Torres del Paine", weather: { wind: 62, gusts: 95 } },
  { park: "Torres del Paine", weather: { wind: 18, gusts: 31 } },
];

function ReplacingExample() {
  const [reading, setReading] = useState(0);
  return (
    <Demo
      title="Replacing the value"
      testing="Rows stay open when the value is replaced with new data of the same shape."
    >
      <div className={styles.actions}>
        <Button
          variant="secondary"
          onClick={() => setReading((current) => (current + 1) % 2)}
        >
          Load next reading
        </Button>
      </div>
      <ObjectInspector label="Weather reading" value={readings[reading]} />
    </Demo>
  );
}

export const ReplacingTheValue: Story = {
  render: () => <ReplacingExample />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("treeitem", { name: /^weather/u }));
    await expect(
      canvas.getByRole("treeitem", { name: /^wind/u }),
    ).toHaveTextContent("62");

    await userEvent.click(
      canvas.getByRole("button", { name: "Load next reading" }),
    );
    await expect(
      canvas.getByRole("treeitem", { name: /^wind/u }),
    ).toHaveTextContent("18");
  },
};

export const NarrowContainer: Story = {
  render: () => (
    <Demo
      title="Narrow container"
      testing="In a space narrower than its rows, the tree scrolls sideways and rows do not wrap."
    >
      <div className={styles.narrow}>
        <ObjectInspector
          label="National parks of the world"
          value={mediumParks}
          defaultExpanded={["$", "$/.continents"]}
        />
      </div>
    </Demo>
  ),
  play: async ({ canvas }) => {
    const tree = canvas.getByRole("tree");
    await expect(tree.scrollWidth).toBeGreaterThan(tree.clientWidth);
  },
};

const longValues = {
  description: "The park covers mountains, glaciers, lakes and rivers. ".repeat(
    12,
  ),
  aVeryLongPropertyNameThatDescribesExactlyWhatTheValueBelowItContains: true,
  years: Array.from({ length: 200 }, (_, index) => 1872 + index),
};

export const LongValues: Story = {
  render: () => (
    <Demo
      title="Long values"
      testing="Long text is cut short with an ellipsis, long lists preview their first five items, and long keys are kept whole."
    >
      <ObjectInspector label="Long values" value={longValues} />
    </Demo>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("treeitem", { name: /^description/u }),
    ).toHaveTextContent(/…"$/u);
    await expect(
      canvas.getByRole("treeitem", { name: /^years/u }),
    ).toHaveTextContent("Array(200) [1872, 1873, 1874, 1875, 1876, …]");
  },
};
