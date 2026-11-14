import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  viteFinal: async (viteConfig) => {
    if (process.env.NODE_ENV === "production") {
      viteConfig.base = "/storybook/";
    }
    viteConfig.resolve = {
      ...viteConfig.resolve,
      dedupe: ["react", "react-dom"],
    };
    return viteConfig;
  },
};

export default config;
