import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import {
  Avatar,
  Badge,
  BarChart,
  CopyButton,
  ExpandableCard,
  IconButton,
  MilestoneProgress,
  PlaybackControls,
  ProgressBar,
  RecordSleeve,
  StatList,
  TrackList,
} from "dustyui";
import { HELIOS } from "./AlbumPlayer";
import { DesertPortrait, FujiLandscape } from "./DesertArtwork";
import expandable from "./ExpandableCard.module.css";
import { ClockIcon, HeartIcon, PinIcon, SunIcon } from "./icons";
import { MonumentValleyCard } from "./MonumentValleyCard";
import { AlbumArtwork } from "./RecordArtwork";
import styles from "./Welcome.module.css";

const WEEK = [
  { label: "M", value: 12, description: "Monday, 12 minutes" },
  { label: "T", value: 25, description: "Tuesday, 25 minutes" },
  { label: "W", value: 0, description: "Wednesday, no practice" },
  { label: "T", value: 18, description: "Thursday, 18 minutes" },
  { label: "F", value: 0, description: "Friday, no practice" },
  { label: "S", value: 0, description: "Saturday, no practice" },
  { label: "S", value: 0, description: "Sunday, no practice" },
];

const LAST_TRACK = HELIOS.tracks.length - 1;

const FUJI_FACTS = [
  ["Elevation", "3,776 m"],
  ["Climbing season", "July to September"],
  ["Best light", "Sunrise"],
] as const;

function FujiCard() {
  return (
    <ExpandableCard
      title="Mount Fuji"
      level={3}
      media={<FujiLandscape />}
      expandedMedia={<FujiLandscape animated />}
      summary="Japan's highest peak, a near-perfect cone 100 kilometres from Tokyo."
    >
      <dl className={expandable.facts}>
        {FUJI_FACTS.map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p>
        Most climbers start from the fifth station and reach the summit in five
        to seven hours. Clear views are most likely on winter mornings.
      </p>
    </ExpandableCard>
  );
}

interface SectionProps {
  number: string;
  title: string;
  status?: ReactNode;
  bare?: boolean;
  fill?: boolean;
  wide?: boolean;
  children: ReactNode;
}

function Section({
  number,
  title,
  status,
  bare,
  fill,
  wide,
  children,
}: SectionProps) {
  return (
    <section
      className={styles.section}
      data-fill={fill || undefined}
      data-wide={wide || undefined}
    >
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {number} / {title}
        </h2>
        {status}
      </header>
      {bare ? children : <div className={styles.surface}>{children}</div>}
    </section>
  );
}

function FeaturedPlayer() {
  const [playing, setPlaying] = useState(true);
  const [track, setTrack] = useState(1);
  const current = HELIOS.tracks[track];

  return (
    <Section
      number="03"
      title="Featured experiment"
      wide
      status={
        <Badge
          label={playing ? "Playing" : "Paused"}
          variant="soft"
          tone={playing ? "accent" : "neutral"}
        />
      }
    >
      <div className={styles.player}>
        <RecordSleeve artwork={<AlbumArtwork />} revealed playing={playing} />
        <div className={styles.playerBody}>
          <div>
            <h3 className={styles.playerTitle}>{HELIOS.title}</h3>
            <p className={styles.playerArtist}>{HELIOS.artist}</p>
            <p className={styles.playerMeta}>
              {playing ? "Now playing" : "Paused"} · {current?.title}
            </p>
          </div>
          <PlaybackControls
            playing={playing}
            progress={0.35}
            onPlayingChange={setPlaying}
            onPrevious={
              track > 0
                ? () => {
                    setTrack(track - 1);
                  }
                : undefined
            }
            onNext={
              track < LAST_TRACK
                ? () => {
                    setTrack(track + 1);
                  }
                : undefined
            }
          />
          <TrackList
            label="Tracks"
            tracks={HELIOS.tracks}
            currentTrack={track}
            onTrackSelect={(index) => {
              setTrack(index);
              setPlaying(true);
            }}
          />
        </div>
      </div>
    </Section>
  );
}

const TRIP_STATS = [
  { label: "Suggested duration", value: "Half-day", icon: <ClockIcon /> },
  { label: "Experience", value: "Scenic drive", icon: <PinIcon /> },
  { label: "Best light", value: "Sunrise", icon: <SunIcon /> },
];

function GuideCard() {
  const [saved, setSaved] = useState(false);

  return (
    <article className={styles.guideCard} aria-labelledby="guide-title">
      <div className={styles.guideIntro}>
        <div className={styles.guideTop}>
          <p className={styles.fieldLabel}>Your local contact</p>
          <IconButton
            variant={saved ? "primary" : "secondary"}
            shape="pill"
            size="small"
            label="Save to favourites"
            aria-pressed={saved}
            icon={<HeartIcon />}
            onClick={() => {
              setSaved(!saved);
            }}
          />
        </div>
        <h3 id="guide-title" className={styles.guideTitle}>
          Meet your guide.
        </h3>
        <p className={styles.quiet}>
          Have questions about exploring Monument Valley? Get in touch.
        </p>
      </div>
      <div className={styles.contact}>
        <Avatar
          name="Wioletta Gluza"
          ring="neutral"
          image={<DesertPortrait />}
        />
        <div className={styles.contactText}>
          <p className={styles.contactName}>Wioletta Gluza</p>
          <p className={styles.status}>Available for enquiries</p>
        </div>
      </div>
      <div className={styles.glance}>
        <h4 id="glance-title" className={styles.fieldLabel}>
          Trip at a glance
        </h4>
        <StatList aria-labelledby="glance-title" stats={TRIP_STATS} />
      </div>
    </article>
  );
}

const LINKS = [
  ["wiola.dev", "https://wiola.dev"],
  ["GitHub", "https://github.com/w-gluza/dustyui"],
  ["npm", "https://www.npmjs.com/package/dustyui"],
] as const;

function Intro() {
  return (
    <header className={styles.intro}>
      <div className={styles.introBar}>
        <p className={styles.brand}>
          <span className={styles.logo} aria-hidden="true">
            D.
          </span>
          <span className={styles.fieldLabel}>
            An experimental component library
          </span>
        </p>
        <p className={styles.fieldLabel}>React / CSS Modules</p>
      </div>
      <div className={styles.introHead}>
        <h1>Dusty UI.</h1>
      </div>
      <div className={styles.introColumns}>
        <div className={styles.introColumn}>
          <h2 className={styles.fieldLabel}>About the project</h2>
          <p>
            A small React component library where I try out ideas, experiment
            with interactions, and play around with design. Built with CSS
            Modules and CSS custom properties, mostly for fun and because I
            enjoy getting the little details right.
          </p>
        </div>
        <div className={styles.introColumn}>
          <h2 className={styles.fieldLabel}>Behind the library</h2>
          <p>
            I’m Wioletta Gluza, an engineer based in London. I build Dusty UI
            for fun and to explore ideas beyond my everyday work.
          </p>
          <ul className={styles.links}>
            {LINKS.map(([name, href]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noreferrer">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.introFoot}>
        <div className={styles.installRow}>
          <code className={styles.install}>npm install dustyui</code>
          <CopyButton
            value="npm install dustyui"
            label="Copy install command"
            iconOnly
            variant="plain"
            size="small"
          />
        </div>
        <p className={styles.fieldLabel}>Explore the components below ↓</p>
      </div>
    </header>
  );
}

function Preview() {
  return (
    <div className={styles.board}>
      <Intro />
      <Section number="01" title="Essentials" fill>
        <GuideCard />
      </Section>
      <Section number="02" title="Editorial" bare fill>
        <MonumentValleyCard titleLevel={3} extended />
      </Section>
      <FeaturedPlayer />
      <Section
        number="04"
        title="Expandable card"
        status={<Badge label="Click to open" />}
        bare
      >
        <FujiCard />
      </Section>
      <Section number="05" title="Data and progress">
        <div className={styles.data}>
          <ProgressBar
            variant="editorial"
            label="Uploading artwork / 001"
            value={0.62}
            startLabel="Album cover.svg"
            endLabel="In progress"
          />
          <MilestoneProgress
            label="Release steps"
            milestones={["Setup", "Design", "Build", "Ship"]}
            completed={2}
            progress={0.4}
          />
          <BarChart label="Practice this week" bars={WEEK} current={3} />
        </div>
      </Section>
    </div>
  );
}

function WelcomePage() {
  return (
    <main className={styles.welcome}>
      <Preview />
    </main>
  );
}

const meta = {
  title: "Welcome",
  parameters: { layout: "padded" },
  render: () => <WelcomePage />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 1, name: "Dusty UI." }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: "wiola.dev" }),
    ).toHaveAttribute("href", "https://wiola.dev");
    await expect(canvas.getByRole("link", { name: "npm" })).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/dustyui",
    );
    await expect(canvas.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/w-gluza/dustyui",
    );
    await expect(
      canvas.getByRole("heading", { level: 3, name: "Monument Valley" }),
    ).toBeVisible();
    await expect(canvas.getAllByRole("heading", { level: 2 })).toHaveLength(7);
    await expect(
      canvas.getByRole("button", { name: "Mount Fuji" }),
    ).toHaveAttribute("aria-expanded", "false");
    await expect(
      canvas.getByRole("article", { name: "Meet your guide." }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Save to favourites" }),
    ).toHaveAttribute("aria-pressed", "false");
    await expect(canvas.getByText("Scenic drive")).toBeVisible();
    await expect(
      canvas.getByRole("progressbar", { name: "Uploading artwork / 001" }),
    ).toHaveAttribute("value", "0.62");
    await expect(canvas.getByRole("button", { name: "Pause" })).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: /Soft Transit/u }),
    ).toHaveAttribute("aria-current", "true");
    await expect(canvas.getByText("Now playing · Soft Transit")).toBeVisible();
  },
};

export const WelcomeDark: Story = {
  ...Welcome,
  globals: { theme: "dusty", scheme: "dark" },
};
