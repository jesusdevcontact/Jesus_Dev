# Deployment

## Hosting

The project deploys to GitHub Pages with the custom domain:

```text
jesusdev.dev
```

The domain is configured through the root `CNAME` file.

## Production Build

Standard production build:

```bash
pnpm build
```

GitHub Pages build:

```bash
pnpm build:pages
```

`build:pages` runs:

```bash
ng build --configuration production --base-href / && node tools/copy-spa-fallback.mjs
```

## SPA Fallback Strategy

GitHub Pages does not natively route all paths to `index.html`. The script:

```text
tools/copy-spa-fallback.mjs
```

copies:

```text
dist/jesusdev-portfolio/browser/index.html
```

to:

```text
dist/jesusdev-portfolio/browser/404.html
```

This allows direct navigation to routes such as `/contact`, `/privacy`, `/cookies`, and `/legal`.

## CI Workflow

Workflow file:

```text
.github/workflows/deploy-pages.yml
```

Trigger:

- Push to `main`.
- Manual `workflow_dispatch`.

Steps:

1. Checkout repository.
2. Setup pnpm `11.5.0`.
3. Setup Node `22`.
4. Restore pnpm cache.
5. Run `pnpm install --frozen-lockfile`.
6. Run `pnpm build:pages`.
7. Configure GitHub Pages.
8. Upload `dist/jesusdev-portfolio/browser`.
9. Deploy Pages artifact.

## Deployment Checks

Before merging deployment changes, run:

```bash
pnpm install --frozen-lockfile
pnpm exec tsc -p tsconfig.app.json --noEmit
pnpm build
pnpm build:pages
```
