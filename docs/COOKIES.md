# Cookie Consent

## Overview

Cookie consent is implemented by:

```text
src/app/shared/components/cookie-consent/
```

The component uses Angular signals and localStorage. No external consent-management platform is currently used.

## Consent Model

Storage key:

```text
jesusdev-cookie-consent
```

Stored JSON shape:

```json
{
  "accepted": true,
  "analytics": true,
  "timestamp": "2026-05-31T00:00:00.000Z"
}
```

Rejecting non-essential cookies stores:

```json
{
  "accepted": false,
  "analytics": false,
  "timestamp": "2026-05-31T00:00:00.000Z"
}
```

Legacy string values, `accepted` and `rejected`, are read and normalized for backward compatibility.

## First-Visit Behavior

If no consent exists:

1. The panel opens automatically.
2. The user sees the consent decision immediately.
3. The available actions are:
   - `Aceptar`
   - `Rechazar no esenciales`
4. Closing with the X button or Escape behaves like rejecting non-essential cookies.

This prevents closing the first-visit prompt without recording a decision.

## Reopening Preferences

The floating cookie icon remains visible. Clicking it:

- Reopens the preferences panel.
- Shows the current analytics state.
- Allows the user to change consent.

If the user closes a reopened panel without choosing a new action, the previous consent remains unchanged.

## Accessibility Behavior

The component includes:

- Dialog semantics.
- Keyboard-accessible buttons.
- Escape key handling.
- Focus on the primary action when opened.
- Focus restoration to the floating cookie button when closed.
- State-aware aria labels for closing behavior.
- `aria-live` status text when a saved choice exists.

## Analytics Integration Point

The app currently records the analytics preference but does not wire an analytics provider in this codebase. If analytics is added later, initialize it only when:

```ts
analytics === true
```

Do not load non-essential analytics scripts before consent.
