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
};

export const TextOnly: Story = {
  args: { media: undefined, expandedMedia: undefined },
};
