import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
} from "dustyui";
import { DesertLandscape, DesertPortrait } from "./DesertArtwork";
import { ArchPoster } from "./PosterArtwork";
import styles from "./Card.module.css";

const AUTHOR = "Wioletta Gluza";
const TITLE = "Monument Valley";
const DESCRIPTION =
  "Sandstone buttes rising 300 metres from the desert floor on the Arizona-Utah border, in the heart of the Navajo Nation.";

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
    variant: { control: "inline-radio", options: ["plain", "poster"] },
  },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MonumentValley: Story = {
  render: (args) => (
    <Card {...args}>
      <CardMedia label="Featured">
        <DesertLandscape />
      </CardMedia>
      <CardContent>
        <CardTitle level={2}>{TITLE}</CardTitle>
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
      canvas.getByRole("heading", { level: 2, name: TITLE }),
    ).toBeVisible();
    await expect(card).toHaveTextContent("Featured");
    await expect(card).toHaveTextContent(AUTHOR);
    await expect(card).toHaveTextContent("6 min read");
    await expect(canvas.queryByRole("img")).toBeNull();
  },
};

export const Poster: Story = {
  args: { variant: "poster" },
  decorators: [(Story) => <div className={styles.narrow}>{Story()}</div>],
  render: (args) => (
    <Card {...args}>
      <CardMedia>
        <ArchPoster />
      </CardMedia>
      <CardContent>
        <Badge label="Featured" variant="editorial" />
        <CardTitle level={2}>Arches National Park</CardTitle>
        <CardDescription>
          More than 2,000 natural stone arches in the red rock country of
          eastern Utah.
        </CardDescription>
        <CardFooter end="5 min read">
          <Avatar
            name={AUTHOR}
            size={44}
            ring="accent"
            decorative
            image={<DesertPortrait />}
          />
          <span className={styles.author}>{AUTHOR}</span>
        </CardFooter>
      </CardContent>
    </Card>
  ),
  play: async ({ canvas }) => {
    const card = canvas.getByRole("article");
    await expect(
      canvas.getByRole("heading", { level: 2, name: "Arches National Park" }),
    ).toBeVisible();
    await expect(getComputedStyle(card).boxShadow).not.toBe("none");
  },
};

export const PosterDark: Story = {
  ...Poster,
  globals: { theme: "dusty", scheme: "dark" },
};

export const Dark: Story = {
  ...MonumentValley,
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  ...MonumentValley,
  globals: { theme: "mono", scheme: "light" },
};

export const WithoutLabel: Story = {
  render: (args) => (
    <Card {...args}>
      <CardMedia>
        <DesertLandscape />
      </CardMedia>
      <CardContent>
        <CardTitle level={2}>{TITLE}</CardTitle>
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
        <CardTitle level={2}>{TITLE}</CardTitle>
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
