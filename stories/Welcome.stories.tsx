import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import styles from "./Welcome.module.css";

function WelcomePage() {
  return (
    <main className={styles.welcome}>
      <h1>DustyUI</h1>
      <p>
        A small React component library, styled with CSS Modules and themed
        through CSS custom properties.
      </p>
      <p>
        I build it for fun, as a place to try ideas and take the time to do them
        properly. I am Wiola, and there is more about me at{" "}
        <a href="https://www.wiola.dev" target="_blank" rel="noreferrer">
          wiola.dev
        </a>
        .
      </p>
      <code className={styles.install}>npm install dustyui</code>
      <p>
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
  },
};
