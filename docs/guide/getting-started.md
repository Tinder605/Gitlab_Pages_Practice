# Getting Started

This project uses VitePress to build a static documentation site from the files under `docs/`.

## Local development

```bash
npm install
npm run docs:dev
```

## Build for production

```bash
npm run docs:build
npm run docs:preview
```

## Add content

Add new Markdown files under `docs/` and link them from `docs/.vitepress/config.ts` as the site grows.

## Deploy

Pushing to the `main` branch triggers the GitHub Actions workflow and publishes `docs/.vitepress/dist` to GitHub Pages.
