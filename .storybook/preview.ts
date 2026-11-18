import { createElement, type ReactNode } from "react";
import type { Preview } from "@storybook/nextjs-vite";
import "dustyui/themes/mono.css";
import "./preview.css";

interface Appearance {
  theme: string;
  scheme: string;
}

function DocsAppearance({
  theme,
  scheme,
  children,
}: Appearance & { children?: ReactNode }) {
  return createElement(
    "div",
    {
      className: "docs-appearance",
      "data-theme": theme,
      "data-color-scheme": scheme,
      ref: (node: HTMLDivElement | null) => {
        const frame = node?.closest<HTMLElement>(".docs-story");
        if (frame) {
          frame.dataset.theme = theme;
          frame.dataset.colorScheme = scheme;
        }
      },
    },
    children,
  );
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: ["dusty", "mono"],
        dynamicTitle: true,
      },
    },
    scheme: {
      description: "Colour scheme",
      toolbar: {
        title: "Scheme",
        icon: "contrast",
        items: ["system", "light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "dusty",
    scheme: "system",
  },
  decorators: [
    (Story, context) => {
      const { theme, scheme } = context.globals as Appearance;
      if (context.viewMode === "docs") {
        return createElement(DocsAppearance, { theme, scheme }, Story());
      }
      const root = document.documentElement;
      root.dataset.theme = theme;
      if (scheme === "system") {
        delete root.dataset.colorScheme;
      } else {
        root.dataset.colorScheme = scheme;
      }
      return Story();
    },
  ],
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Welcome", "Showcase", "Components", "Media", "Utilities"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
  },
};

export default preview;
