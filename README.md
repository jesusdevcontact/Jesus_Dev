# Jesus Dev Portfolio

Production portfolio for Jesus Martinez Escobar, built with Angular 21 to present fullstack Angular/Laravel work, technical direction, project case studies, legal pages, and contact paths.

## Live Demo

- Production: [https://jesusdev.dev](https://jesusdev.dev)
- Hosting: GitHub Pages with a custom domain from `CNAME`

## Screenshots

Screenshots are not committed yet. Recommended captures:

| View | Suggested file |
| --- | --- |
| Dark home | `docs/screenshots/home-dark.png` |
| Light home | `docs/screenshots/home-light.png` |
| Cookie preferences | `docs/screenshots/cookie-preferences.png` |
| Mobile navigation | `docs/screenshots/mobile-nav.png` |

## Technology Stack

| Area | Tooling |
| --- | --- |
| Framework | Angular 21.2.x, standalone components |
| Language | TypeScript 5.9.x |
| Package manager | pnpm 11.x |
| Styling | SCSS, CSS custom properties |
| Icons | `@lucide/angular` |
| i18n | `@ngx-translate/core`, JSON translation files |
| Deployment | GitHub Actions + GitHub Pages |

See [docs/STACK.md](docs/STACK.md) for full dependency and tooling notes.

## Features

- Premium responsive landing page with hero, stack, project, journey, and contact sections.
- Lazy routed legal and contact pages.
- Multi-language support for Spanish, English, and French.
- Persistent light/dark theme toggle.
- Production-style cookie consent with localStorage persistence.
- Accessible navigation, skip link, visible focus states, and reduced-motion support.

See [docs/FEATURES.md](docs/FEATURES.md) for the feature inventory.

## Theme System

The app uses CSS design tokens under `:root`, `[data-theme="dark"]`, and `[data-theme="light"]`. `ThemeService` stores the selected theme in `localStorage` using the `theme` key and applies the value to `document.documentElement.dataset.theme`.

See [docs/THEMING.md](docs/THEMING.md).

## Cookie Consent

Cookie consent is managed by `CookieConsentComponent` and stored in localStorage under `jesusdev-cookie-consent`.

```json
{
  "accepted": true,
  "analytics": true,
  "timestamp": "2026-05-31T00:00:00.000Z"
}
```

See [docs/COOKIES.md](docs/COOKIES.md).

## Internationalization

Translations live in `src/assets/i18n`:

- `es.json`
- `en.json`
- `fr.json`

`I18nService` stores the selected language in `localStorage` as `jesusdev-language`, updates the document language, and refreshes SEO meta tags.

## Accessibility

The app includes:

- Skip link to main content.
- Keyboard-accessible navigation, language selector, theme toggle, and cookie preferences.
- Visible focus styling.
- Reduced-motion handling.
- `aria-label`, `aria-pressed`, `aria-expanded`, and dialog semantics where appropriate.

## Development Setup

Prerequisites:

- Node.js 22.x recommended, matching CI.
- pnpm 11.x.

Install dependencies:

```bash
pnpm install
```

Start the local dev server:

```bash
pnpm start
```

## Build Commands

```bash
pnpm exec tsc -p tsconfig.app.json --noEmit
pnpm build
pnpm build:pages
```

`pnpm build:pages` creates the production build and then copies `index.html` to `404.html` for GitHub Pages SPA fallback support.

## Deployment Process

Deployment is handled by `.github/workflows/deploy-pages.yml`:

1. Install pnpm 11.5.0.
2. Use Node 22 with pnpm cache.
3. Run `pnpm install --frozen-lockfile`.
4. Run `pnpm build:pages`.
5. Upload `dist/jesusdev-portfolio/browser`.
6. Deploy to GitHub Pages.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Project Structure

```text
src/app/
  core/        Shared data, models, i18n, theme, utilities
  components/  Portfolio-specific cards
  features/    Routed pages
  layout/      Site header and footer
  shared/      Reusable UI, directives, pipes
```

Detailed notes are in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Roadmap Summary

Completed: Angular 21 migration, pnpm migration, theme system, cookie consent rework, audit remediation, GitHub Pages deployment, and documentation baseline.

Next candidates: committed screenshots, richer project case studies, automated accessibility checks, and optional analytics integration gated by consent.

See [docs/ROADMAP.md](docs/ROADMAP.md).

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Stack](docs/STACK.md)
- [Features](docs/FEATURES.md)
- [Theming](docs/THEMING.md)
- [Cookies](docs/COOKIES.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Development](docs/DEVELOPMENT.md)
- [Roadmap](docs/ROADMAP.md)
- [Changelog](docs/CHANGELOG.md)
- [AI Context](docs/AI_CONTEXT.md)
