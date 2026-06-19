import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const browserOutputPath = join(process.cwd(), 'dist', 'jesusdev-portfolio', 'browser');
const indexPath = join(browserOutputPath, 'index.html');
const fallbackPath = join(browserOutputPath, '404.html');
const nojekyllPath = join(browserOutputPath, '.nojekyll');
const directRoutes = ['contact', 'legal', 'privacy', 'cookies'];

if (!existsSync(indexPath)) {
  throw new Error(`Cannot create GitHub Pages SPA fallback. Missing ${indexPath}`);
}

copyFileSync(indexPath, fallbackPath);
console.log(`Created SPA fallback: ${fallbackPath}`);

for (const route of directRoutes) {
  const routeDirectory = join(browserOutputPath, route);
  const routeIndexPath = join(routeDirectory, 'index.html');

  mkdirSync(routeDirectory, { recursive: true });
  copyFileSync(indexPath, routeIndexPath);
  console.log(`Created direct route entry: ${routeIndexPath}`);
}

writeFileSync(nojekyllPath, '');
console.log(`Created GitHub Pages marker: ${nojekyllPath}`);
