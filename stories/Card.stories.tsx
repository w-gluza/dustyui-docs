import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import {
  Avatar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
} from "dustyui";
import { DesertLandscape, DesertPortrait } from "./DesertArtwork";
import styles from "./Card.module.css";

const AUTHOR = "Wioletta Gluza";
const DESCRIPTION =
  "Salt flats below sea level, golden badlands and dunes that sing in the wind - the hottest, driest and lowest national park in the USA.";

function Author() {
  return (
    <>
      <Avatar
        name={AUTHOR}
        size={44}
        ring="neutral"
        decorative
        image={<DesertPortrait />}
      />
      <span className={styles.author}>{AUTHOR}</span>
    </>
  );
}

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    as: { control: "select", options: ["article", "section", "div"] },
  },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeathValley: Story = {
  render: (args) => (
    <Card {...args}>
      <CardMedia label="Featured">
        <DesertLandscape />
      </CardMedia>
      <CardContent>
        <CardTitle level={2}>Death Valley</CardTitle>
        <CardDescription>{DESCRIPTION}</CardDescription>
        <CardFooter end="6 min read">
          <Author />
        </CardFooter>
      </CardContent>
    </Card>
  ),
  play: async ({ canvas }) => {
    const card = canvas.getByRole("article");
    await expect(
      canvas.getByRole("heading", { level: 2, name: "Death Valley" }),
    ).toBeVisible();
    await expect(card).toHaveTextContent("Featured");
    await expect(card).toHaveTextContent(AUTHOR);
    await expect(card).toHaveTextContent("6 min read");
    await expect(canvas.queryByRole("img")).toBeNull();
  },
};

export const Dark: Story = {
  ...DeathValley,
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  ...DeathValley,
  globals: { theme: "mono", scheme: "light" },
};

export const WithoutLabel: Story = {
  render: (args) => (
    <Card {...args}>
      <CardMedia>
        <DesertLandscape />
      </CardMedia>
      <CardContent>
        <CardTitle level={2}>Death Valley</CardTitle>
        <CardDescription>{DESCRIPTION}</CardDescription>
      </CardContent>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("article")).not.toHaveTextContent("Featured");
  },
};

export const TextOnly: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <CardTitle level={2}>Death Valley</CardTitle>
        <CardDescription>{DESCRIPTION}</CardDescription>
        <CardFooter end="6 min read">
          <Author />
        </CardFooter>
      </CardContent>
    </Card>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("article").querySelector("svg")).toBe(
      canvas.getByRole("article").querySelector("footer svg"),
    );
  },
};
