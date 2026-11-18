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
import {
  AUTHOR,
  Author,
  DESCRIPTION,
  MonumentValleyCard,
  TITLE,
} from "./MonumentValleyCard";
import { ArchPoster } from "./PosterArtwork";
import styles from "./Card.module.css";

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
  render: (args) => <MonumentValleyCard {...args} />,
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

export const AsSection: Story = {
  args: { as: "section", "aria-label": "Featured story" },
  render: (args) => <MonumentValleyCard {...args} />,
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("region", { name: "Featured story" }),
    ).toBeVisible();
  },
};

export const RightToLeft: Story = {
  render: (args) => (
    <div dir="rtl">
      <MonumentValleyCard {...args} />
    </div>
  ),
};

export const PosterRightToLeft: Story = {
  ...Poster,
  decorators: [
    (Story) => (
      <div dir="rtl" className={styles.narrow}>
        {Story()}
      </div>
    ),
  ],
};

export const PosterMono: Story = {
  ...Poster,
  globals: { theme: "mono", scheme: "light" },
};

export const PosterWithMediaLabel: Story = {
  args: { variant: "poster" },
  decorators: [(Story) => <div className={styles.narrow}>{Story()}</div>],
  render: (args) => (
    <Card {...args}>
      <CardMedia label="Featured">
        <ArchPoster />
      </CardMedia>
      <CardContent>
        <CardTitle level={2}>Arches National Park</CardTitle>
        <CardDescription>
          More than 2,000 natural stone arches in the red rock country of
          eastern Utah.
        </CardDescription>
      </CardContent>
    </Card>
  ),
};

export const LongContentInANarrowColumn: Story = {
  decorators: [(Story) => <div className={styles.column}>{Story()}</div>],
  render: (args) => (
    <Card {...args}>
      <CardMedia label="Featured destination of the season">
        <DesertLandscape />
      </CardMedia>
      <CardContent>
        <CardTitle level={2}>
          Monument Valley Navajo Tribal Park at first light
        </CardTitle>
        <CardDescription>
          {DESCRIPTION} Shaped by millions of years of erosion, the valley is
          known for its rock formations and its changing colours through the
          day.
        </CardDescription>
        <CardFooter end="16 min read, updated yesterday">
          <Author />
        </CardFooter>
      </CardContent>
    </Card>
  ),
  play: async ({ canvas }) => {
    const card = canvas.getByRole("article");
    await expect(card.scrollWidth).toBeLessThanOrEqual(card.clientWidth);
  },
};
