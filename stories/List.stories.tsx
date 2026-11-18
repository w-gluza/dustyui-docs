import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Avatar, Badge, EmptyState, IconButton, List, ListItem } from "dustyui";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  ClockIcon,
  HistoryIcon,
  PlayIcon,
} from "./icons";
import { DesertPortrait } from "./DesertArtwork";
import { AlbumArtwork } from "./RecordArtwork";
import { SnareArtwork } from "./SnareArtwork";
import styles from "./List.module.css";

const RUDIMENTS = [
  { name: "Single Stroke Roll", bpm: 70, minutes: 3 },
  { name: "Double Stroke Roll", bpm: 60, minutes: 3 },
  { name: "Paradiddle", bpm: 80, minutes: 4 },
];

const meta = {
  title: "Components/List",
  component: List,
  subcomponents: { ListItem },
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["plain", "divided", "contained"],
    },
  },
  args: { "aria-label": "Rudiments" },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <List {...args}>
      {RUDIMENTS.map((rudiment) => (
        <ListItem
          key={rudiment.name}
          title={rudiment.name}
          trailing={`${String(rudiment.bpm)} BPM`}
        />
      ))}
    </List>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
  },
};

export const Plain: Story = { ...Default, args: { variant: "plain" } };

export const Divided: Story = { ...Default, args: { variant: "divided" } };

export const Contained: Story = { ...Default, args: { variant: "contained" } };

export const ContainedDark: Story = {
  ...Contained,
  globals: { theme: "dusty", scheme: "dark" },
};

export const WithLeadingIcon: Story = {
  render: (args) => (
    <List {...args} aria-label="Your activity">
      <ListItem
        leading={
          <span className={styles.icon}>
            <ClockIcon />
          </span>
        }
        title="Total practice time"
        trailing="4h 12m"
      />
      <ListItem
        leading={
          <span className={styles.icon}>
            <CalendarIcon />
          </span>
        }
        title="Total sessions"
        trailing="18"
      />
      <ListItem
        leading={
          <span className={styles.icon}>
            <HistoryIcon />
          </span>
        }
        title="Last practised"
        trailing="Today"
      />
    </List>
  ),
};

export const WithImage: Story = {
  args: { variant: "contained" },
  render: (args) => (
    <List {...args} aria-label="Lessons">
      <ListItem
        leading={
          <span className={styles.thumbnail}>
            <SnareArtwork />
          </span>
        }
        title="Snare basics"
        description="Video lesson · 12 min"
      />
      <ListItem
        leading={
          <span className={styles.thumbnail}>
            <AlbumArtwork />
          </span>
        }
        title="Helios play-along"
        description="Album · 38 min"
      />
      <ListItem
        leading={
          <span className={styles.thumbnail}>
            <DesertPortrait />
          </span>
        }
        title="Desert sessions"
        description="Playlist · 9 tracks"
      />
    </List>
  ),
};

export const WithAvatar: Story = {
  args: { variant: "contained" },
  render: (args) => (
    <List {...args} aria-label="Teachers">
      <ListItem
        leading={<Avatar name="Maya Chen" size="small" />}
        title="Maya Chen"
        description="Rudiments and reading"
      />
      <ListItem
        leading={<Avatar name="Jonas Weber" size="small" />}
        title="Jonas Weber"
        description="Groove and independence"
      />
      <ListItem
        leading={<Avatar name="Ines Duarte" size="small" />}
        title="Ines Duarte"
        description="Brushes and dynamics"
      />
    </List>
  ),
};

export const WithNumbering: Story = {
  args: { numbered: true },
  render: (args) => (
    <List {...args}>
      {RUDIMENTS.map((rudiment) => (
        <ListItem key={rudiment.name} title={rudiment.name} />
      ))}
    </List>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("list").tagName).toBe("OL");
  },
};

export const WithDescriptionAndMetadata: Story = {
  args: { variant: "contained" },
  render: (args) => (
    <List {...args}>
      {RUDIMENTS.map((rudiment) => (
        <ListItem
          key={rudiment.name}
          overline={`${String(rudiment.minutes)} min · 2 rounds`}
          title={rudiment.name}
          description={`${String(rudiment.bpm)} BPM`}
          trailing={<Badge label="Level 1" variant="soft" />}
        />
      ))}
    </List>
  ),
};

export const InteractiveSelectable: Story = {
  args: { variant: "contained" },
  render: function SelectableList(args) {
    const [selected, setSelected] = useState("Double Stroke Roll");

    return (
      <List {...args}>
        {RUDIMENTS.map((rudiment) => (
          <ListItem
            key={rudiment.name}
            title={rudiment.name}
            description={`${String(rudiment.bpm)} BPM`}
            selected={selected === rudiment.name}
            onClick={() => {
              setSelected(rudiment.name);
            }}
          />
        ))}
      </List>
    );
  },
};

export const Links: Story = {
  render: (args) => (
    <List {...args}>
      {RUDIMENTS.map((rudiment) => (
        <ListItem
          key={rudiment.name}
          href={`#${rudiment.name.toLowerCase().replaceAll(" ", "-")}`}
          title={rudiment.name}
          trailing={
            <span className={styles.icon}>
              <ArrowUpRightIcon />
            </span>
          }
        />
      ))}
    </List>
  ),
};

export const WithTrailingActions: Story = {
  render: (args) => (
    <List {...args}>
      {RUDIMENTS.map((rudiment) => (
        <ListItem
          key={rudiment.name}
          title={rudiment.name}
          description={`${String(rudiment.minutes)} min · ${String(rudiment.bpm)} BPM`}
          actions={
            <IconButton
              variant="plain"
              size="small"
              shape="pill"
              label={`Play ${rudiment.name}`}
              icon={<PlayIcon />}
            />
          }
        />
      ))}
    </List>
  ),
};

export const Loading: Story = {
  args: {
    variant: "contained",
    loading: true,
    loadingLabel: "Loading rudiments",
  },
  render: (args) => (
    <List {...args}>
      <ListItem title="Not shown while loading" />
    </List>
  ),
};

export const Empty: Story = {
  render: () => (
    <EmptyState
      level={2}
      title="No saved routines"
      description="Routines you save will be listed here."
    />
  ),
};

export const Interactions: Story = {
  ...InteractiveSelectable,
  tags: ["!dev"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /^Paradiddle/u }));

    await expect(
      canvas.getByRole("button", { name: /^Paradiddle/u }),
    ).toHaveAttribute("aria-current", "true");
    await expect(
      canvas.getByRole("button", { name: /^Double Stroke Roll/u }),
    ).not.toHaveAttribute("aria-current");
  },
};

export const Mono: Story = {
  ...Default,
  args: { variant: "contained" },
  globals: { theme: "mono", scheme: "light" },
};

export const SelectedLink: Story = {
  render: (args) => (
    <List {...args}>
      {RUDIMENTS.map((rudiment, index) => (
        <ListItem
          key={rudiment.name}
          href={`#${rudiment.name.toLowerCase().replaceAll(" ", "-")}`}
          title={rudiment.name}
          selected={index === 1 ? "page" : false}
        />
      ))}
    </List>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("link", { name: "Double Stroke Roll" }),
    ).toHaveAttribute("aria-current", "page");
  },
};

export const SelectedPlain: Story = {
  ...SelectedLink,
  args: { variant: "plain" },
};

export const SelectedDark: Story = {
  ...InteractiveSelectable,
  globals: { theme: "dusty", scheme: "dark" },
};

export const ClickableRowsWithTrailingActions: Story = {
  args: { variant: "contained" },
  render: (args) => (
    <List {...args}>
      {RUDIMENTS.map((rudiment) => (
        <ListItem
          key={rudiment.name}
          href={`#${rudiment.name.toLowerCase().replaceAll(" ", "-")}`}
          title={rudiment.name}
          description={`${String(rudiment.minutes)} min`}
          actions={
            <IconButton
              variant="plain"
              size="small"
              shape="pill"
              label={`Play ${rudiment.name}`}
              icon={<PlayIcon />}
            />
          }
        />
      ))}
    </List>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getAllByRole("link")).toHaveLength(3);
    await expect(canvas.getAllByRole("button")).toHaveLength(3);
    await expect(canvasElement.querySelector("a button")).toBeNull();
  },
};

export const LongContent: Story = {
  args: { variant: "contained" },
  render: (args) => (
    <List {...args}>
      <ListItem
        title="Single Stroke Roll played hand to hand at an even volume"
        description="Start slowly, keep both sticks at the same height and only speed up once every note sounds the same."
        trailing="70 BPM for three minutes, then 80"
      />
      <ListItem
        href="#double-stroke-roll"
        title="Double Stroke Roll"
        trailing="Sixty beats per minute for the first three minutes"
      />
    </List>
  ),
};

export const RightToLeft: Story = {
  ...ClickableRowsWithTrailingActions,
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
};

export const NumberedWithLeading: Story = {
  args: { numbered: true },
  render: (args) => (
    <List {...args}>
      {RUDIMENTS.map((rudiment) => (
        <ListItem
          key={rudiment.name}
          leading={
            <span className={styles.icon}>
              <ClockIcon />
            </span>
          }
          title={rudiment.name}
          trailing={`${String(rudiment.minutes)} min`}
        />
      ))}
    </List>
  ),
};
