# AI Context

Use this file as the fastest project briefing for ChatGPT Projects, Codex, Claude Code, and similar assistants.

## Purpose

This is the production portfolio for Jesus Martinez Escobar. It presents fullstack Angular/Laravel positioning, selected projects, technical stack, experience timeline, contact paths, and legal/cookie/privacy information.

Live domain:

```text
https://jesusdev.dev
```

## Technical Stack

| Area | Choice |
| --- | --- |
| Framework | Angular 21, standalone components |
| Language | TypeScript 5.9 |
| Package manager | pnpm 11 |
| Styling | SCSS and CSS custom properties |
| i18n | `@ngx-translate/core` |
| Icons | `@lucide/angular` |
| Hosting | GitHub Pages |
| CI | GitHub Actions |

## Architectural Decisions

- Standalone components only; no NgModule feature architecture.
- Lazy routes in `src/app/app.routes.ts`.
- Small local state with Angular signals.
- No global state store.
- Content is mostly static and typed through `core/models`.
- Portfolio content lives in `core/data/portfolio.content.ts`.
- Runtime preferences use localStorage.

Important files:

| File | Purpose |
| --- | --- |
| `src/app/app.routes.ts` | Route map. |
| `src/app/core/i18n/i18n.service.ts` | Language, document lang, SEO metadata. |
| `src/app/core/theme/theme.service.ts` | Theme preference and `data-theme`. |
| `src/app/core/overlay/overlay-stack.service.ts` | Shared modal stack, focus trap, inert state and scroll lock. |
| `src/styles.scss` | Global tokens, dark/light themes, base styles. |
| `.github/workflows/deploy-pages.yml` | GitHub Pages deployment. |
| `tools/copy-spa-fallback.mjs` | Copies `index.html` to `404.html`. |

## Design Philosophy

- Premium, modern developer portfolio.
- Dark theme is the primary identity.
- Light theme must remain polished, not generic white.
- Prefer glass-like surfaces, subtle gradients, strong text contrast, and restrained motion.
- Avoid decorative UI that reduces readability.

## Constraints

- Do not upgrade Angular to v22 unless explicitly requested.
- Do not upgrade TypeScript to v6 unless Angular tooling officially supports it in this project.
- Use pnpm only.
- Do not reintroduce `package-lock.json` or `yarn.lock`.
- Keep GitHub Pages static hosting constraints in mind.
- Preserve accessibility behavior when changing the header, overlays, storage, or navigation.

## Coding Conventions

- Prefer standalone Angular components.
- Use `ChangeDetectionStrategy.OnPush`.
- Use signals for local UI state when appropriate.
- Keep shared behavior in `core` or `shared`.
- Use CSS custom properties for theme colors.
- Add translations in all supported language JSON files.
- Use `@lucide/angular` icons when possible.

## Preferences And Storage

| Feature | Storage key | Values |
| --- | --- | --- |
| Language | `jesusdev-language` | `es`, `en`, `fr` |
| Theme | `theme` | `dark`, `light` |
No analytics, tracking pixels, tracking cookies, or consent UI are present. `AppComponent` removes the obsolete `jesusdev-cookie-consent` key without touching language or theme.

## Deployment Strategy

Build command for CI:

```bash
pnpm build:pages
```

The output path is:

```text
dist/jesusdev-portfolio/browser
```

`build:pages` creates `404.html` for direct route access on GitHub Pages.

## Accessibility Standards

Maintain:

- Keyboard access for all interactive controls.
- Visible focus styles.
- Skip link.
- Correct `aria-label`, `aria-expanded`, `aria-pressed`, and dialog semantics.
- Reduced-motion support.
- Consent flows that cannot be dismissed on first visit without recording a decision.

## Documentation Map

- `README.md`: public project overview.
- `docs/ARCHITECTURE.md`: app structure and routing.
- `docs/STACK.md`: dependencies and tooling.
- `docs/FEATURES.md`: implemented features.
- `docs/THEMING.md`: theme architecture.
- `docs/COOKIES.md`: consent model and behavior.
- `docs/DEPLOYMENT.md`: GitHub Pages deployment.
- `docs/DEVELOPMENT.md`: local setup and maintenance.
- `docs/ROADMAP.md`: status and future ideas.
- `docs/CHANGELOG.md`: project changes.

## Known Future Goals

- Add committed screenshots.
- Add automated accessibility checks.
- Re-audit privacy and consent requirements before adding any analytics.
- Expand project case studies.
- Add route-specific SEO improvements.
