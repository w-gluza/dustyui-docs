import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Avatar, Badge, Button, IconButton } from "dustyui";
import { DesertPortrait } from "./DesertArtwork";
import { ArchIcon, SparkleIcon, StarIcon } from "./icons";
import { MonumentValleyCard } from "./MonumentValleyCard";
import styles from "./Welcome.module.css";

const SWATCHES = [
  ["action", styles.swatchAction],
  ["primary", styles.swatchPrimary],
  ["secondary", styles.swatchSecondary],
  ["highlight", styles.swatchHighlight],
  ["shadow", styles.swatchShadow],
] as const;

function Preview() {
  return (
    <section className={styles.board} aria-labelledby="preview-title">
      <h2 id="preview-title" className={styles.boardTitle}>
        At a glance
      </h2>
      <div className={styles.boardGrid}>
        <div className={styles.column}>
          <div className={styles.group}>
            <Avatar
              name="Wioletta Gluza"
              ring="neutral"
              image={<DesertPortrait />}
            />
            <Avatar name="Maya Torres" ring="accent" />
            <Avatar name="Leo Park" />
            <IconButton variant="secondary" label="Add a person" icon="+" />
          </div>
          <hr className={styles.rule} />
          <div className={styles.group}>
            <Button>Get started</Button>
            <Button variant="secondary" icon={<ArchIcon />} iconPosition="end">
              Learn more
            </Button>
            <Button variant="plain">Cancel</Button>
            <Button disabled>Disabled</Button>
          </div>
          <hr className={styles.rule} />
          <div className={styles.group}>
            <Badge label="New" />
            <Badge
              label="New"
              variant="soft"
              tone="accent"
              icon={<SparkleIcon />}
            />
            <Badge label="Featured" variant="solid" icon={<StarIcon />} />
            <Badge label="New" variant="editorial" />
          </div>
          <hr className={styles.rule} />
          <ul className={styles.swatches} aria-label="Theme colours">
            {SWATCHES.map(([name, swatch]) => (
              <li key={name}>
                <span className={`${styles.swatch} ${swatch}`} />
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <MonumentValleyCard titleLevel={3} />
        </div>
      </div>
    </section>
  );
}

function WelcomePage() {
  return (
    <main className={styles.welcome}>
      <div className={styles.intro}>
        <h1>DustyUI</h1>
        <p>
          A small React component library, styled with CSS Modules and themed
          through CSS custom properties.
        </p>
        <p>
          I build it for fun, as a place to try ideas and take the time to do
          them properly. I am Wiola, and there is more about me at{" "}
          <a href="https://www.wiola.dev" target="_blank" rel="noreferrer">
            wiola.dev
          </a>
          .
        </p>
        <code className={styles.install}>npm install dustyui</code>
      </div>
      <Preview />
      <p className={styles.intro}>
        The components are in the sidebar. Showcase, Themes shows all of them
        together, and the toolbar switches the theme and the colour scheme.
      </p>
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
      canvas.getByRole("heading", { level: 1, name: "DustyUI" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: "wiola.dev" }),
    ).toHaveAttribute("href", "https://www.wiola.dev");
    await expect(
      canvas.getByRole("heading", { level: 3, name: "Monument Valley" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Add a person" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("list", { name: "Theme colours" }).children,
    ).toHaveLength(5);
  },
};

export const WelcomeDark: Story = {
  ...Welcome,
  globals: { theme: "dusty", scheme: "dark" },
};
