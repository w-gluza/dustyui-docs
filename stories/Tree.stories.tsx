import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Tree, type TreeNode } from "dustyui";
import { Demo } from "./Demo";

interface Folder extends TreeNode {
  readonly name: string;
}

function folder(name: string, ...contents: Folder[]): Folder {
  return {
    id: name,
    name,
    hasChildren: contents.length > 0,
    children: () => contents,
  };
}

const files = folder(
  "dustyui",
  folder(
    "src",
    folder("Button", folder("Button.tsx"), folder("Button.module.css")),
    folder("Tree", folder("Tree.tsx"), folder("treeModel.ts")),
    folder("index.ts"),
  ),
  folder("package.json"),
  folder("README.md"),
);

const description = `
Shows any nested data as a keyboard-operable tree. It knows nothing about what the rows contain: you give it a root node and say how to draw a row.

\`\`\`tsx
import { Tree } from "dustyui";

<Tree
  root={root}
  label="Project files"
  renderRow={(row) => row.node.name}
  getRowText={(row) => row.node.name}
/>
\`\`\`

A node needs an \`id\`, a \`hasChildren\` flag and a \`children()\` function. \`children()\` is only called when the row is opened. \`label\` is required and names the tree for screen readers. \`getRowText\` enables jumping to a row by typing.

To control which rows are open, pass \`expanded\` and \`onExpandedChange\`. Otherwise use \`defaultExpanded\`. The types reject passing both.

The selected row follows focus. Listen with \`onSelectedChange\`, or pass \`selected\` to choose the row yourself; the tree brings it into view without taking focus.

**Keyboard**

| Key | Action |
| --- | --- |
| Down, Up | Next or previous visible row |
| Right | Opens a closed row; on an open row, moves to its first child |
| Left | Closes an open row; otherwise moves to the parent |
| Home, End | First or last visible row |
| Enter, Space | Opens or closes the row |
| \* | Opens every sibling of the row |
| Letters | Jumps to the next row starting with what you type |

The whole tree is one tab stop.

**Limitations**

- A tree with more than 200 visible rows renders only the rows near the view, so every row must have the same height. Set \`--tree-row-height\` to change it, and \`--tree-indent\` to change how far each level is indented.
- In a large tree the browser's own find does not see rows that are scrolled out of view.
- Left and Right are not swapped for right-to-left languages.
`;

const meta = {
  title: "Components/Tree",
  component: Tree,
  tags: ["autodocs"],
  argTypes: {
    root: {
      description:
        "The top node. It needs an id, a hasChildren flag and a children() function.",
      control: false,
      table: { type: { summary: "TreeNode" } },
      type: { name: "other", value: "", required: true },
    },
    label: {
      description: "Names the tree for screen readers.",
      control: false,
      table: { type: { summary: "string" } },
      type: { name: "other", value: "", required: true },
    },
    renderRow: {
      description: "Draws the content of one row.",
      control: false,
      table: { type: { summary: "(row: TreeRow) => ReactNode" } },
      type: { name: "other", value: "", required: true },
    },
    getRowText: {
      description: "The text of a row, used to jump to it by typing.",
      control: false,
      table: { type: { summary: "(row: TreeRow) => string" } },
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
      table: { type: { summary: "ReadonlySet<string> | readonly string[]" } },
    },
    selected: {
      description:
        "The id of the selected row. Pass it to control selection yourself.",
      control: false,
      table: { type: { summary: "string" } },
    },
    onSelectedChange: {
      description: "Called with the id of the row that becomes selected.",
      control: false,
      table: { type: { summary: "(selected: string) => void" } },
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

export const Files: Story = {
  render: () => (
    <Demo
      title="A file tree"
      testing="Tree on its own, with no object inspection, showing a nested folder structure."
    >
      <Tree
        root={files}
        label="Project files"
        defaultExpanded={["dustyui", "src"]}
        renderRow={(row) => row.node.name}
        getRowText={(row) => row.node.name}
      />
    </Demo>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowRight}");
    await expect(
      canvas.getByRole("treeitem", { name: "Button.tsx" }),
    ).toBeVisible();
  },
};

export const Closed: Story = {
  render: () => (
    <Demo
      title="Starting closed"
      testing="A tree with nothing open by default."
    >
      <Tree
        root={files}
        label="Project files"
        renderRow={(row) => row.node.name}
        getRowText={(row) => row.node.name}
      />
    </Demo>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("treeitem")).toHaveLength(1);
  },
};

const basicTree = (
  <Tree
    root={files}
    label="Project files"
    defaultExpanded={["dustyui", "src", "Tree"]}
    renderRow={(row) => row.node.name}
    getRowText={(row) => row.node.name}
  />
);

export const Dark: Story = {
  render: () => basicTree,
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  render: () => basicTree,
  globals: { theme: "mono", scheme: "light" },
};

export const RightToLeft: Story = {
  render: () => <div dir="rtl">{basicTree}</div>,
};

function ControlledTree() {
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(
    () => new Set(["dustyui"]),
  );
  const [selected, setSelected] = useState("package.json");

  return (
    <>
      <p>
        Selected: <output>{selected}</output>
      </p>
      <Tree
        root={files}
        label="Project files"
        expanded={expanded}
        onExpandedChange={setExpanded}
        selected={selected}
        onSelectedChange={setSelected}
        renderRow={(row) => row.node.name}
        getRowText={(row) => row.node.name}
      />
    </>
  );
}

export const Controlled: Story = {
  render: () => <ControlledTree />,
  play: async ({ canvas, userEvent }) => {
    await expect(
      canvas.getByRole("treeitem", { name: "package.json" }),
    ).toHaveAttribute("aria-selected", "true");

    await userEvent.click(canvas.getByRole("treeitem", { name: "src" }));

    await expect(canvas.getByRole("status")).toHaveTextContent("src");
    await expect(
      canvas.getByRole("treeitem", { name: "index.ts" }),
    ).toBeVisible();
  },
};

const manyFiles = folder(
  "archive",
  ...Array.from({ length: 600 }, (_, index) =>
    folder(`take-${String(index + 1).padStart(3, "0")}.flac`),
  ),
);

export const LargeTree: Story = {
  render: () => (
    <Tree
      root={manyFiles}
      label="Archive"
      defaultExpanded={["archive"]}
      style={{ maxBlockSize: "20rem", overflow: "auto" }}
      renderRow={(row) => row.node.name}
      getRowText={(row) => row.node.name}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("treeitem").length).toBeLessThan(200);
  },
};

export const LongLabelsInANarrowSpace: Story = {
  render: () => (
    <div style={{ inlineSize: "12rem" }}>
      <Tree
        root={folder(
          "recordings",
          folder(
            "2026",
            folder("a_very_long_unbroken_file_name_for_a_live_session.flac"),
          ),
        )}
        label="Recordings"
        defaultExpanded={["recordings", "2026"]}
        renderRow={(row) => row.node.name}
      />
    </div>
  ),
};

export const CustomRowHeightAndIndent: Story = {
  render: () => (
    <Tree
      root={files}
      label="Project files"
      defaultExpanded={["dustyui", "src", "Tree"]}
      style={
        { "--tree-row-height": "2.25rem", "--tree-indent": "2rem" } as never
      }
      renderRow={(row) => row.node.name}
    />
  ),
};

export const ControlInARow: Story = {
  render: () => (
    <Tree
      root={files}
      label="Project files"
      defaultExpanded={["dustyui"]}
      renderRow={(row) => (
        <>
          {row.node.name} <button type="button">Rename {row.node.name}</button>
        </>
      )}
      getRowText={(row) => row.node.name}
    />
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Rename src" }));

    await expect(
      canvas.getByRole("treeitem", { name: /^src/u }),
    ).toHaveAttribute("aria-expanded", "false");
  },
};

function TreeWithRowAction() {
  const [opened, setOpened] = useState<string>();

  return (
    <>
      <Tree
        root={files}
        label="Project files"
        defaultExpanded={["dustyui"]}
        renderRow={(row) => row.node.name}
        getRowText={(row) => row.node.name}
        onRowAction={(row) => {
          setOpened(row.node.name);
        }}
      />
      <p role="status">
        {opened ? `Opened ${opened}` : "Press Enter on a row to open it"}
      </p>
    </>
  );
}

export const RowAction: Story = {
  render: () => <TreeWithRowAction />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await userEvent.keyboard("{ArrowDown}{Enter}");

    await expect(canvas.getByRole("status")).toHaveTextContent(/^Opened /u);
  },
};
