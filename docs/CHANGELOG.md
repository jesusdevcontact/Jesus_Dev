# Changelog

This project follows a lightweight changelog format. Dates use ISO format when known.

## 2026-05-31

### Added

- Complete documentation baseline under `docs/`.
- Root `README.md` with project overview, setup, deployment, architecture, and roadmap links.
- Light/dark theme system using `ThemeService` and CSS custom properties.
- Header theme toggle with localized accessible labels.
- Pre-boot theme initializer in `src/index.html`.
- Production-style cookie consent flow with structured localStorage state.
- Cookie preferences reopening via persistent floating icon.
- State-aware cookie close behavior and focus management.

### Changed

- Migrated package management from npm to pnpm.
- Added `packageManager: pnpm@11.5.0`.
- Updated GitHub Pages CI workflow to use pnpm.
- Updated visible build reference from npm to pnpm.
- Upgraded Angular framework packages to the Angular 21.2 patch line.
- Upgraded Angular CLI/build tooling within Angular 21.
- Upgraded `@lucide/angular`.
- Upgraded `zone.js` within Angular 21 compatibility.
- Removed npm lockfile and generated `pnpm-lock.yaml`.

### Fixed

- Resolved remaining audit findings from transitive `webpack-dev-server` and `uuid` packages using pnpm overrides.
- Removed unnecessary cookie banner contact action.
- Ensured first-visit cookie prompt records a decision before closing.

### Not Changed

- Angular was not upgraded to v22.
- TypeScript was not upgraded to v6.
