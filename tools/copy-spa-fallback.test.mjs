import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const helper = fileURLToPath(new URL('./copy-spa-fallback.mjs', import.meta.url));
const fixtureHtml = '<html><head><title>Fixture</title><meta name="description" content="Fixture"><link rel="canonical" href="https://jesusdev.dev/"><meta property="og:title" content="Fixture"><meta property="og:description" content="Fixture"><meta property="og:type" content="website"><meta property="og:url" content="https://jesusdev.dev/"><meta property="og:image" content="fixture.jpg"><meta name="twitter:title" content="Fixture"><meta name="twitter:description" content="Fixture"><meta name="twitter:image" content="fixture.jpg"></head><body>Fixture</body></html>';

test('ships real WebP and AVIF screenshot assets and thumbnails', () => {
  for (const name of ['migrator-local-desktop', 'migrator-results-mongodb', 'migrator-results-postgresql', 'migrator-results-mariadb']) {
    for (const folder of ['', 'thumbs/']) {
      const root = new URL(`../assets/MigradorBasesDeDatos/${folder}`, import.meta.url);
      const webp = readFileSync(new URL(`${name}.webp`, root));
      assert.equal(webp.toString('ascii', 0, 4), 'RIFF');
      assert.equal(webp.toString('ascii', 8, 12), 'WEBP');
      const avif = readFileSync(new URL(`${name}.avif`, root));
      assert.equal(avif.toString('ascii', 4, 12), 'ftypavif');
      const sizeOffset = avif.indexOf(Buffer.from('ispe'));
      assert.ok(sizeOffset > 0);
      assert.equal(avif.readUInt32BE(sizeOffset + 8), folder ? 600 : 1440);
      assert.equal(avif.readUInt32BE(sizeOffset + 12), folder ? 417 : 1000);
    }
  }
});

test('publishes the migrator direct route through the Pages CLI without changing existing routes', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'ai-migrator-pages-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const output = join(root, 'dist', 'jesusdev-portfolio', 'browser');
  mkdirSync(output, { recursive: true });
  writeFileSync(join(output, 'index.html'), fixtureHtml);

  const result = spawnSync(process.execPath, [helper], { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0);
  assert.equal(result.stderr, '');
  const routes = [
    'contact', 'legal', 'privacy', 'cookies',
    'projects/aprende-con-jesus-dev', 'projects/focusflow', 'projects/connectingdevs',
    'projects/gibora', 'projects/pegasus-medical', 'projects/migrador-bases-de-datos',
  ];
  assert.equal(result.stdout, [
    `Created SPA fallback: ${join(output, '404.html')}`,
    ...routes.map((route) => `Created direct route entry: ${join(output, route, 'index.html')}`),
    `Created GitHub Pages marker: ${join(output, '.nojekyll')}`,
    '',
  ].join('\n'));
  assert.equal(readFileSync(join(output, '404.html'), 'utf8'), fixtureHtml);
  assert.equal(readFileSync(join(output, '.nojekyll'), 'utf8'), '');
  assert.equal(readFileSync(join(output, 'index.html'), 'utf8'), fixtureHtml);
  assert.deepEqual(readdirSync(join(output, 'projects')).sort(), routes.slice(4).map((route) => route.split('/')[1]).sort());

  const html = readFileSync(join(output, 'projects', 'migrador-bases-de-datos', 'index.html'), 'utf8');
  const title = 'Migrador de bases de datos con IA | Jesús Martínez Escobar';
  const description = 'Experimento de migración SQLite con Llama en el navegador, WebLLM y validación Python, con resultados verificados en PostgreSQL, MariaDB y MongoDB.';
  const url = 'https://jesusdev.dev/projects/migrador-bases-de-datos';
  const image = 'https://jesusdev.dev/assets/MigradorBasesDeDatos/migrator-local-desktop.webp';
  assert.equal(html, `<html><head><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${url}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="article"><meta property="og:url" content="${url}"><meta property="og:image" content="${image}"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${image}"></head><body>Fixture</body></html>`);

  const contact = readFileSync(join(output, 'contact', 'index.html'), 'utf8');
  assert.ok(contact.includes('<title>Contacto | Jesús Martínez Escobar</title>'));
  assert.ok(contact.includes('<link rel="canonical" href="https://jesusdev.dev/contact">'));
  assert.ok(contact.includes('content="https://jesusdev.dev/assets/img/og-image.jpg"'));
});
