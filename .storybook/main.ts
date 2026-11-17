import path from "node:path";
import type { StorybookConfig } from "@storybook/nextjs-vite";
import remarkGfm from "remark-gfm";

function getLocalSourceAlias() {
  const source = process.env.DUSTYUI_SRC;
  if (!source) {
    return [];
  }
  const root = path.resolve(source);
  return [
    { find: /^dustyui$/u, replacement: path.join(root, "index.ts") },
    {
      find: /^dustyui\/tokens\.css$/u,
      replacement: path.join(root, "styles/tokens.css"),
    },
    {
      find: /^dustyui\/themes\/(.+)\.css$/u,
      replacement: path.join(root, "styles/themes/$1.css"),
    },
  ];
}

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.tsx"],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: { remarkPlugins: [remarkGfm] },
        },
      },
    },
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
    const existingAlias = viteConfig.resolve?.alias ?? [];
    viteConfig.resolve = {
      ...viteConfig.resolve,
      dedupe: ["react", "react-dom"],
      alias: [
        ...getLocalSourceAlias(),
        ...(Array.isArray(existingAlias)
          ? existingAlias
          : Object.entries(existingAlias).map(([find, replacement]) => ({
              find,
              replacement,
            }))),
      ],
    };
    return viteConfig;
  },
};

export default config;
