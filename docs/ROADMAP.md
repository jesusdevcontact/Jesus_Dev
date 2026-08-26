# Roadmap

## Completed

- Angular 21 application baseline.
- Standalone component architecture.
- Lazy routed home, contact, and legal pages.
- pnpm migration.
- GitHub Pages CI deployment.
- SPA fallback generation.
- Light/dark theme system.
- Cookie consent rework.
- Multi-language support for Spanish, English, and French.
- Dependency audit remediation with pnpm overrides.
- Documentation baseline.

## Current Status

The project is production-ready:

- Builds successfully.
- Uses pnpm 11.
- Deploys through GitHub Pages.
- Has persistent theme, language, and cookie consent preferences.
- Uses accessible navigation and preference controls.

## Future Improvements

| Priority | Improvement | Notes |
| --- | --- | --- |
| High | Add committed screenshots | Helps README and portfolio previews. |
| High | Add automated accessibility checks | Consider Playwright + axe or similar tooling. |
| Medium | Expand project case studies | Add deeper architecture screenshots or diagrams. |
| Medium | Evaluate privacy-preserving analytics | Re-audit storage, third parties, and consent requirements before loading any script. |
| Medium | Add route-level SEO data | Current i18n service updates global SEO text. |
| Low | Add visual regression checks | Useful once screenshots stabilize. |
| Low | Add richer docs diagrams | Keep diagrams lightweight and maintainable. |

## Nice-To-Have Enhancements

- Theme-aware Open Graph images.
- Downloadable resume/CV link.
- More granular cookie preferences if new optional services are added.
- Additional language support if needed.
- Lighthouse budget tracking in CI.
