import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, waitFor } from "storybook/test";
import { Button, ExpandableCard, type ExpandableCardProps } from "dustyui";
import { FujiLandscape } from "./DesertArtwork";
import styles from "./ExpandableCard.module.css";

interface Place {
  title: string;
  summary: string;
  facts: readonly (readonly [string, string])[];
  body: string;
}

const MOUNT_FUJI: Place = {
  title: "Mount Fuji",
  summary:
    "Japan's highest peak, a near-perfect cone 100 kilometres from Tokyo.",
  facts: [
    ["Elevation", "3,776 m"],
    ["Climbing season", "July to September"],
    ["Best light", "Sunrise"],
  ],
  body: "Most climbers start from the fifth station and reach the summit in five to seven hours. Clear views are most likely on winter mornings.",
};

const PLACES: readonly Place[] = [
  MOUNT_FUJI,
  {
    title: "Lake Kawaguchi",
    summary:
      "The easiest of the Fuji Five Lakes to reach, with the mountain mirrored in the water.",
    facts: [
      ["Elevation", "830 m"],
      ["From Tokyo", "2 hours"],
      ["Best season", "Autumn"],
    ],
    body: "The north shore gives the classic reflection on still mornings. Maple leaves turn in November.",
  },
  {
    title: "Chureito Pagoda",
    summary: "A five-storey pagoda on a hillside facing the mountain.",
    facts: [
      ["Built", "1963"],
      ["Steps", "398"],
      ["Best season", "Spring"],
    ],
    body: "The climb from Arakura Sengen Shrine takes about ten minutes. Cherry blossom peaks in mid April.",
  },
];

function Details({ place }: { place: Place }) {
  return (
    <>
      <dl className={styles.facts}>
        {place.facts.map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p>{place.body}</p>
      <Button variant="secondary">Plan a visit</Button>
    </>
  );
}

type StoryProps = Omit<ExpandableCardProps, "expanded" | "defaultExpanded"> & {
  defaultExpanded?: boolean;
};

const meta = {
  title: "Components/ExpandableCard",
  component: ExpandableCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    level: { control: "inline-radio", options: [2, 3, 4, 5, 6] },
  },
  args: {
    title: MOUNT_FUJI.title,
    level: 2,
    summary: MOUNT_FUJI.summary,
    media: <FujiLandscape />,
    expandedMedia: <FujiLandscape animated />,
    children: <Details place={MOUNT_FUJI} />,
    onExpandedChange: fn(),
  },
  decorators: [(Story) => <div className={styles.frame}>{Story()}</div>],
} satisfies Meta<StoryProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Mount Fuji" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(canvas.queryByRole("dialog")).toBeNull();

    await userEvent.click(trigger);

    const dialog = await canvas.findByRole("dialog", {
      name: "Mount Fuji",
    });
    await expect(dialog).toBeVisible();
    await expect(args.onExpandedChange).toHaveBeenCalledWith(true);
    await waitFor(() =>
      expect(
        canvas.getByRole("button", { name: "Plan a visit" }),
      ).toBeVisible(),
    );

    await userEvent.click(canvas.getByRole("button", { name: "Close" }));

    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
    await expect(args.onExpandedChange).toHaveBeenLastCalledWith(false);
  },
};

export const Expanded: Story = {
  args: { defaultExpanded: true },
  tags: ["!autodocs"],
  play: async ({ canvas }) => {
    await waitFor(() =>
      expect(
        canvas.getByRole("button", { name: "Plan a visit" }),
      ).toBeVisible(),
    );
  },
};

export const ExpandedDark: Story = {
  ...Expanded,
  globals: { theme: "dusty", scheme: "dark" },
};

export const Grid: Story = {
  decorators: [],
  render: (args) => (
    <div className={styles.grid}>
      {PLACES.map((place) => (
        <ExpandableCard
          key={place.title}
          {...args}
          title={place.title}
          summary={place.summary}
        >
          <Details place={place} />
        </ExpandableCard>
      ))}
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getAllByRole("button")).toHaveLength(PLACES.length);
    await userEvent.click(
      canvas.getByRole("button", { name: "Chureito Pagoda" }),
    );

    await expect(
      await canvas.findByRole("dialog", { name: "Chureito Pagoda" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
  },
};

export const TextOnly: Story = {
  args: { media: undefined, expandedMedia: undefined },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Mount Fuji" }));

    await expect(
      await canvas.findByRole("dialog", { name: "Mount Fuji" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
  },
};

export const Dark: Story = {
  globals: { theme: "dusty", scheme: "dark" },
};

export const Mono: Story = {
  globals: { theme: "mono", scheme: "light" },
};

export const ExpandedMono: Story = {
  ...Expanded,
  globals: { theme: "mono", scheme: "light" },
};

export const WithoutSummary: Story = {
  args: { summary: undefined },
};

export const LongTitle: Story = {
  args: {
    title:
      "Mount Fuji seen from the north shore of Lake Kawaguchi on a still winter morning",
  },
};

export const LongContent: Story = {
  args: {
    defaultExpanded: true,
    children: (
      <>
        {PLACES.concat(PLACES, PLACES).map((place, index) => (
          <p key={index}>{place.body}</p>
        ))}
        <Button variant="secondary">Plan a visit</Button>
      </>
    ),
  },
  tags: ["!autodocs"],
  play: async ({ canvas }) => {
    const dialog = await canvas.findByRole("dialog", { name: "Mount Fuji" });

    await expect(dialog.scrollHeight).toBeGreaterThan(dialog.clientHeight);
  },
};

export const RightToLeft: Story = {
  args: { defaultExpanded: true },
  decorators: [(Story) => <div dir="rtl">{Story()}</div>],
  tags: ["!autodocs"],
};

function ControlledCard(args: StoryProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ExpandableCard
      {...args}
      defaultExpanded={undefined}
      expanded={expanded}
      onExpandedChange={(next) => {
        setExpanded(next);
        args.onExpandedChange?.(next);
      }}
    />
  );
}

export const Controlled: Story = {
  render: (args) => <ControlledCard {...args} />,
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Mount Fuji" }));

    await expect(
      await canvas.findByRole("dialog", { name: "Mount Fuji" }),
    ).toBeVisible();
    await expect(args.onExpandedChange).toHaveBeenLastCalledWith(true);
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(canvas.queryByRole("dialog")).toBeNull());
  },
};
