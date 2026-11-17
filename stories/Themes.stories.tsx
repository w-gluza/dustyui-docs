import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Avatar, Badge, Button, IconButton, ObjectInspector } from "dustyui";
import { createEveryKind, createTricky } from "./data/values";
import { Demo } from "./Demo";
import { SparkleIcon } from "./icons";
import styles from "./Demo.module.css";

const everyKind = createEveryKind();
const tricky = createTricky();

function AllComponents() {
  return (
    <Demo
      title="Every component in one theme"
      testing="Each component rendered together, so the accessibility scan checks contrast in this theme and colour scheme."
    >
      <div className={styles.actions}>
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button loading>Saving</Button>
        <IconButton label="Close" icon="×" />
        <Badge label="New" icon={<SparkleIcon />} />
        <Avatar name="Wioletta Gluza" size={40} />
      </div>
      <ObjectInspector
        label="Every kind of value"
        value={everyKind}
        searchable
        showDetails
      />
      <ObjectInspector label="Tricky values" value={tricky} />
    </Demo>
  );
}

const meta = {
  title: "Showcase/Themes",
  parameters: { layout: "padded" },
  render: () => <AllComponents />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function themed(theme: string, scheme: string, surface: string): Story {
  return {
    globals: { theme, scheme },
    play: async ({ canvas, userEvent }) => {
      await userEvent.type(canvas.getByRole("searchbox"), "a");
      await expect(await canvas.findByText(/^\d+ match/u)).toBeVisible();
      await userEvent.keyboard("{Enter}");
      const root = document.documentElement;
      await expect(root.dataset.theme).toBe(theme);
      await expect(root.dataset.colorScheme).toBe(scheme);
      await expect(getComputedStyle(document.body).backgroundColor).toBe(
        surface,
      );
    },
  };
}

export const DustyLight = themed("dusty", "light", "rgb(250, 247, 242)");
export const DustyDark = themed("dusty", "dark", "rgb(20, 25, 27)");
export const MonoLight = themed("mono", "light", "rgb(250, 250, 250)");
export const MonoDark = themed("mono", "dark", "rgb(26, 26, 26)");
