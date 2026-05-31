# Theming

## Overview

The project supports dark and light themes through CSS custom properties and `ThemeService`. The dark theme remains the primary visual identity, while the light theme keeps the same premium glass-like portfolio style with higher daylight readability.

## Theme Architecture

Theme tokens are defined in `src/styles.scss`:

```scss
:root,
[data-theme="dark"] {
  ...
}

[data-theme="light"] {
  ...
}
```

Theme-aware styles consume tokens such as:

- `--bg`
- `--bg-page`
- `--surface`
- `--surface-strong`
- `--text-strong`
- `--text-muted`
- `--border-subtle`
- `--shadow-md`
- `--hero-bg`
- `--panel-bg`

## ThemeService

File:

```text
src/app/core/theme/theme.service.ts
```

Responsibilities:

- Resolve the initial theme.
- Expose the current theme as a signal.
- Expose the icon and next theme as computed values.
- Apply `data-theme` to `document.documentElement`.
- Update `color-scheme`.
- Persist the selected value.

## Persistence

Storage key:

```text
theme
```

Allowed values:

```text
dark
light
```

Initial priority:

1. Stored `localStorage` preference.
2. Browser `prefers-color-scheme: dark`.
3. Dark fallback.

`src/index.html` also includes a small pre-boot script to apply the theme before Angular starts, reducing refresh flicker.

## Dark Mode

Dark mode uses:

- Near-black page background.
- Cyan/green/blue accent gradients.
- Glass surfaces with subtle white borders.
- Strong light text contrast.

## Light Mode

Light mode uses:

- Soft cool backgrounds instead of plain white.
- Dark readable text.
- More opaque glass surfaces.
- Adjusted accent colors for contrast.
- Lighter shadows using blue-gray opacity.

## Adding New Themes

To add a future theme:

1. Add a new union value to `ThemePreference`.
2. Add token definitions in `src/styles.scss`.
3. Update `ThemeService.toggleTheme()` or replace it with explicit theme selection.
4. Add translations under `theme`.
5. Verify contrast, focus states, and build output.

## Guidance

- Prefer existing tokens over component-specific hard-coded colors.
- Add new tokens only when multiple components need the same semantic value.
- Keep component SCSS focused on layout and state, not theme-specific color branches.
