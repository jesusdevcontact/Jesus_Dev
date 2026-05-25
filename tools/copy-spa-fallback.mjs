import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const browserOutputPath = join(process.cwd(), 'dist', 'jesusdev-portfolio', 'browser');
const indexPath = join(browserOutputPath, 'index.html');
const fallbackPath = join(browserOutputPath, '404.html');

if (!existsSync(indexPath)) {
  throw new Error(`Cannot create GitHub Pages SPA fallback. Missing ${indexPath}`);
}

copyFileSync(indexPath, fallbackPath);
console.log(`Created SPA fallback: ${fallbackPath}`);
