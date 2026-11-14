# DustyUI docs

Landing page and Storybook for [DustyUI](https://github.com/w-gluza/dustyui).

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
| `npm run dev`       | Landing page on http://localhost:3000                            |
| `npm run storybook` | Storybook dev server                                             |
| `npm run test`      | Runs every story in a headless browser with accessibility checks |
| `npm run build`     | Builds Storybook into `public/storybook`, then the Next app      |
| `npm run lint`      | ESLint, with accessibility rules as errors                       |
| `npm run typecheck` | Type-checks with TypeScript 7                                    |
| `npm run format`    | Prettier                                                         |
