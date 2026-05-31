# Stack

## Runtime And Framework

| Dependency | Current line |
| --- | --- |
| Angular framework | `21.2.x` |
| Angular CLI | `21.2.x` |
| Angular build tooling | `21.2.x` |
| TypeScript | `5.9.x` |
| RxJS | `7.8.x` |
| Zone.js | `0.16.x` |

The project must remain on Angular 21 unless a deliberate Angular major upgrade is planned.

## Package Manager

The project uses pnpm exclusively:

```json
"packageManager": "pnpm@11.5.0"
```

Lockfile:

- `pnpm-lock.yaml`

Do not add `package-lock.json` or `yarn.lock`.

## Frontend Libraries

| Library | Purpose |
| --- | --- |
| `@lucide/angular` | Icon rendering. |
| `@ngx-translate/core` | Runtime translation service. |
| `@ngx-translate/http-loader` | Translation file loading. |
| `tslib` | TypeScript runtime helpers. |

## Build Tooling

Angular uses the application builder:

```json
"builder": "@angular-devkit/build-angular:application"
```

Production output:

```text
dist/jesusdev-portfolio/browser
```

Budgets:

| Budget | Warning | Error |
| --- | --- | --- |
| Initial bundle | `600kb` | `1mb` |
| Component style | `12kb` | `18kb` |

## pnpm Workspace Settings

`pnpm-workspace.yaml` contains:

- `overrides` for transitive audit remediation:
  - `webpack-dev-server: ^5.2.4`
  - `uuid: ^11.1.1`
- `allowBuilds` for native/tooling packages required by Angular build dependencies.

## Deployment Stack

| Area | Tool |
| --- | --- |
| CI | GitHub Actions |
| Hosting | GitHub Pages |
| Domain | `jesusdev.dev` through `CNAME` |
| Artifact path | `dist/jesusdev-portfolio/browser` |

## GitHub Pages Configuration

Workflow:

```text
.github/workflows/deploy-pages.yml
```

The workflow uses:

- `pnpm/action-setup@v4`
- `actions/setup-node@v4`
- `actions/configure-pages@v5`
- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`
