# Development

## Prerequisites

| Tool | Version |
| --- | --- |
| Node.js | 22.x recommended |
| pnpm | 11.x |

The project declares:

```json
"packageManager": "pnpm@11.5.0"
```

## Local Setup

```bash
pnpm install
pnpm start
```

The dev server runs:

```bash
ng serve --host 127.0.0.1 --port 4200
```

Open:

```text
http://127.0.0.1:4200
```

## Common Commands

| Command | Purpose |
| --- | --- |
| `pnpm start` | Run local dev server. |
| `pnpm build` | Production build. |
| `pnpm build:pages` | Production build plus GitHub Pages SPA fallback. |
| `pnpm exec tsc -p tsconfig.app.json --noEmit` | TypeScript compilation check. |
| `pnpm watch` | Development watch build. |
| `pnpm test` | Angular test command. |

## Type Checking

Run:

```bash
pnpm exec tsc -p tsconfig.app.json --noEmit
```

This checks TypeScript and Angular template types for the app entry.

## Maintenance Tasks

### Add A Translation

1. Add the key to all files in `src/assets/i18n`.
2. Use `TranslatePipe` in templates or `TranslateService` in services.
3. Run type check and build.

### Add A Page

1. Create a standalone component under `src/app/features`.
2. Add a lazy route in `src/app/app.routes.ts`.
3. Add navigation if needed in `core/data/portfolio.content.ts`.
4. Verify `pnpm build:pages`.

### Update Theme Tokens

1. Edit `src/styles.scss`.
2. Prefer semantic tokens.
3. Verify both dark and light themes manually.

### Update Dependencies

1. Check Angular compatibility first.
2. Keep Angular 21 unless planning a major migration.
3. Keep TypeScript inside Angular's supported range.
4. Run:

```bash
pnpm install
pnpm audit
pnpm exec tsc -p tsconfig.app.json --noEmit
pnpm build
pnpm build:pages
```

## Package Manager Rules

- Use pnpm only.
- Keep `pnpm-lock.yaml`.
- Do not commit npm or yarn lockfiles.
- Preserve `pnpm-workspace.yaml` overrides unless Angular tooling removes the need for them.
