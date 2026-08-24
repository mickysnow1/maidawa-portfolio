# MAIDAWA Portfolio

Portfolio website built with Next.js App Router, React, TypeScript, Tailwind CSS, and CSS Modules.

## Scripts

- `npm run dev` starts the Next development server.
- `npm run build` creates a production build.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint.
- `npm run test` runs the Vitest suite.

## Stack

- Next.js App Router in `src/app`
- Tailwind CSS v4 wired through `postcss.config.mjs`
- Existing design tokens and section styles in `src/index.css` and CSS Modules
- Vitest for focused component tests

## GitHub Codespaces

This repository uses Tailwind CSS v4. Tailwind’s PostCSS adapter depends on `@tailwindcss/oxide`, which loads a platform-specific native package such as `@tailwindcss/oxide-linux-x64-gnu`. That package is an npm optional dependency. If a Codespace reuses a partial `node_modules` folder or installs with optional dependencies omitted, `npm run dev` can fail while evaluating a CSS module with an error saying that the native binding cannot be found.

The repository includes `.npmrc` with `include=optional` and a `.devcontainer/devcontainer.json` whose post-create command runs `npm ci --include=optional`. For a new Codespace, dependency installation should therefore happen automatically. If the Codespace already existed before this configuration was added, rebuild the container or run the following once from the repository root:

```bash
rm -rf node_modules .next
npm ci --include=optional
npm run dev
```

Do not commit `node_modules` or `.next`. They are intentionally ignored in `.gitignore` and should be rebuilt inside the Codespace’s Linux environment.
