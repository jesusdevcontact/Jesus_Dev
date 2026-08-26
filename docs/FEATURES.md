# Features

## Hero

The home page opens with a premium hero section presenting:

- Fullstack Angular/Laravel positioning.
- Primary project/contact actions.
- Profile summary card.
- Technical status and stack highlights.

## Navigation

The header includes:

- Brand link to the hero section.
- Primary navigation for page sections.
- Mobile menu toggle.
- Language selector.
- Light/dark theme toggle.

Navigation uses accessible labels, `aria-expanded`, and visible focus states.

## Projects

Project cards document selected portfolio work with:

- Project type and summary.
- Product problem.
- Technical decisions.
- Architecture notes.
- Quality/testing notes.
- Stack impact.

Project data is centralized in `core/data/portfolio.content.ts`.

## Timeline

The journey/experience section presents:

- DAW background.
- Internship context.
- Current fullstack progression.

## Contact

The contact page provides a lightweight form that prepares an email rather than sending data through a backend service. Direct professional links are also available.

## Multi-Language Support

Supported languages:

| Language | Code |
| --- | --- |
| Spanish | `es` |
| English | `en` |
| French | `fr` |

Translation files live in `src/assets/i18n`. `I18nService` persists the selected language and updates SEO metadata.

## Theme Switcher

The header includes an icon-only theme toggle:

- Sun icon when the next action is switching to light mode.
- Moon icon when the next action is switching to dark mode.
- Preference is stored in `localStorage` as `theme`.

See [THEMING.md](THEMING.md).

## Browser Storage

The site stores only functional language and theme preferences. It has no analytics, advertising pixels, tracking cookies, or consent banner.

See [COOKIES.md](COOKIES.md).

## Responsive Behavior

The layout uses CSS grid, flexbox, `clamp()`, and mobile-specific breakpoints. The header collapses navigation into a mobile menu at narrower widths.

## Legal Pages

The app includes legal routes for:

- Privacy policy.
- Cookies policy.
- Legal notice.

All use the same lazy-loaded `LegalPageComponent` with route data selecting content.
