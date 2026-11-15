# DustyUI docs

The documentation site for [DustyUI](https://github.com/w-gluza/dustyui), live at [dustyui.com](https://www.dustyui.com/).

It is a Storybook served through a Next.js app. Every story is also a test: it runs in a headless browser with accessibility checks.

## Preview components

```bash
npm install
npm run storybook
```

Storybook opens on http://localhost:6006.

## Preview unpublished DustyUI changes

With the `dustyui` repo cloned next to this one:

```bash
(cd ../dustyui && npm run build)
npm link ../dustyui
```

`npm install` removes the link, so run `npm link ../dustyui` again afterwards.

## Scripts

| Script              | What it does                                                     |
| ------------------- | ---------------------------------------------------------------- |
| `npm run storybook` | Storybook dev server                                             |
| `npm run dev`       | The Next.js app, serving the Storybook from the last build       |
| `npm run test`      | Runs every story in a headless browser with accessibility checks |
| `npm run build`     | Builds Storybook into `public/storybook`, then the Next app      |
| `npm run lint`      | ESLint, with accessibility rules as errors                       |
| `npm run typecheck` | Type-checks with TypeScript 7                                    |
| `npm run format`    | Prettier                                                         |

Run `npx playwright install chromium` once before the first `npm run test`.
