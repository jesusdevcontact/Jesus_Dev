import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const browserOutputPath = join(process.cwd(), 'dist', 'jesusdev-portfolio', 'browser');
const indexPath = join(browserOutputPath, 'index.html');
const fallbackPath = join(browserOutputPath, '404.html');
const nojekyllPath = join(browserOutputPath, '.nojekyll');

if (!existsSync(indexPath)) {
  throw new Error(`Cannot create GitHub Pages SPA fallback. Missing ${indexPath}`);
}

copyFileSync(indexPath, fallbackPath);
console.log(`Created SPA fallback: ${fallbackPath}`);

writeFileSync(nojekyllPath, '');
console.log(`Created GitHub Pages marker: ${nojekyllPath}`);
