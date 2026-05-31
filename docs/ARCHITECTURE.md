# Architecture

This project is a standalone Angular portfolio application optimized for static deployment on GitHub Pages.

## Application Structure

```text
src/app/
  app.component.ts
  app.routes.ts
  core/
  components/
  features/
  layout/
  shared/
```

| Area | Purpose |
| --- | --- |
| `core/` | Cross-cutting data, models, services, and utilities. |
| `components/` | Portfolio-specific reusable display components such as project and tech stack cards. |
| `features/` | Lazy routed page components. |
| `layout/` | Persistent page chrome: header and footer. |
| `shared/` | Generic reusable UI, directives, and pipes. |

## Core Modules

The project uses standalone Angular components rather than NgModules.

Important core files:

- `core/data/portfolio.content.ts`: portfolio content model data.
- `core/models/portfolio.models.ts`: TypeScript interfaces for portfolio content.
- `core/i18n/i18n.service.ts`: language selection, persistence, document language, SEO meta updates.
- `core/theme/theme.service.ts`: light/dark theme state and persistence.
- `core/utils/contact-mailto.ts`: contact mailto generation.

## Layout System

`AppComponent` renders the global shell:

```html
<a class="skip-link" href="#main-content">...</a>
<jd-site-header />
<router-outlet />
<jd-site-footer />
<jd-cookie-consent />
```

`SiteHeaderComponent` owns:

- Brand link.
- Primary navigation.
- Mobile navigation toggle.
- Language selector.
- Theme toggle.

`SiteFooterComponent` owns footer copy, legal links, and social/contact links.

## Shared Components

| Component | Responsibility |
| --- | --- |
| `ui-button` | Shared button styling and link/button presentation. |
| `section-shell` | Common section layout wrapper. |
| `cookie-consent` | Persistent cookie consent and preferences panel. |

Shared utilities:

- `RevealOnScrollDirective`: progressive reveal behavior.
- `TranslateArrayPipe`: translation helper for array content.

## Services

| Service | State | Persistence |
| --- | --- | --- |
| `I18nService` | Current language signal | `localStorage: jesusdev-language` |
| `ThemeService` | Current theme signal | `localStorage: theme` |
| `CookieConsentComponent` local state | Consent signal | `localStorage: jesusdev-cookie-consent` |

## State Management Approach

The app uses local Angular signals for small UI state:

- Header menu open/closed.
- Scroll state.
- Theme preference.
- Cookie consent panel and stored choice.
- Current language.

There is no global store. This is intentional because the application is static, content-driven, and low-interaction.

## Routing Architecture

Routes are declared in `src/app/app.routes.ts` and lazy-load standalone components:

| Path | Component | Notes |
| --- | --- | --- |
| `/` | `HomePageComponent` | Main portfolio page. |
| `/contact` | `ContactPageComponent` | Contact form that prepares an email. |
| `/privacy` | `LegalPageComponent` | Legal content selected by route data. |
| `/cookies` | `LegalPageComponent` | Legal content selected by route data. |
| `/legal` | `LegalPageComponent` | Legal content selected by route data. |
| `**` | Redirect to `/` | Static-site fallback behavior. |

GitHub Pages routing is supported by copying `index.html` to `404.html` during `pnpm build:pages`.
