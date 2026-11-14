import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Tree, type TreeNode } from "dustyui";

interface Folder extends TreeNode {
  readonly name: string;
}

function folder(name: string, ...contents: Folder[]): Folder {
  return {
    id: name,
    name,
    childCount: contents.length,
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

const meta = {
  title: "Components/Tree",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Files: Story = {
  render: () => (
    <Tree
      root={files}
      label="Project files"
      defaultExpanded={["dustyui", "src"]}
      renderRow={(row) => row.node.name}
      getRowText={(row) => row.node.name}
    />
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
    <Tree
      root={files}
      label="Project files"
      renderRow={(row) => row.node.name}
      getRowText={(row) => row.node.name}
    />
  ),
};
