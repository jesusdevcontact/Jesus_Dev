# Browser Storage And Cookies

## Decision

The site does not show a cookie consent banner because the application does not set tracking cookies or load analytics, advertising pixels, session replay, tag managers, or other non-essential third-party scripts.

A consent prompt for functional preferences would imply a tracking choice that does not exist. The former consent component was therefore removed.

## Storage Inventory

The application intentionally writes only these functional `localStorage` preferences:

| Key | Values | Purpose |
| --- | --- | --- |
| `jesusdev-language` | `es`, `en`, `fr` | Restore the visitor's selected language. |
| `theme` | `dark`, `light` | Restore the visitor's selected color theme. |

The application does not intentionally write `sessionStorage` or `document.cookie` values. It has no backend session, account, checkout, or server-side form submission.

The obsolete `jesusdev-cookie-consent` value is removed during application startup. Language and theme preferences are not removed.

## Third Parties

The production document contains no analytics SDK, tag manager, tracking pixel, embedded social widget, advertising script, or remote font loader. External GitHub, LinkedIn, demo, and email destinations are ordinary links and load only after the visitor activates them.

GitHub Pages provides static hosting and may process standard request metadata as described in GitHub's own terms. This application does not receive or combine those hosting logs.

## Verification Evidence

The storage and tracking review covered application TypeScript, templates, the static `index.html`, configuration, dependencies, documentation, and generated-page tooling. The only runtime storage calls are:

- `I18nService`: reads and writes `jesusdev-language`.
- `ThemeService` and the pre-render theme bootstrap: read and write `theme`.
- `AppComponent`: removes the obsolete `jesusdev-cookie-consent` value.

If analytics or another non-essential service is introduced later, this decision must be revisited before its script is loaded.
