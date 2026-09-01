import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outputRootPath = join(process.cwd(), 'dist', 'jesusdev-portfolio');
const legacyBrowserOutputPath = join(outputRootPath, 'browser');
const browserOutputPath = existsSync(join(outputRootPath, 'index.html')) ? outputRootPath : legacyBrowserOutputPath;
const indexPath = join(browserOutputPath, 'index.html');
const fallbackPath = join(browserOutputPath, '404.html');
const nojekyllPath = join(browserOutputPath, '.nojekyll');
const defaultImage = 'https://jesusdev.dev/assets/img/og-image.jpg';
const directRoutes = [
  {
    route: 'contact',
    title: 'Contacto | Jesús Martínez Escobar',
    description: 'Contacto profesional de Jesús Martínez Escobar para oportunidades Frontend, Full Stack, Angular, Laravel y proyectos web.',
  },
  {
    route: 'legal',
    title: 'Aviso legal | Jesús Martínez Escobar',
    description: 'Aviso legal de jesusdev.dev, portfolio personal de Jesús Martínez Escobar para proyectos, experiencia y contacto profesional.',
  },
  {
    route: 'privacy',
    title: 'Política de privacidad | Jesús Martínez Escobar',
    description: 'Política de privacidad de jesusdev.dev, portfolio personal de Jesús Martínez Escobar alojado en GitHub Pages.',
  },
  {
    route: 'cookies',
    title: 'Política de cookies | Jesús Martínez Escobar',
    description: 'Información sobre preferencias locales, cookies y almacenamiento del navegador en jesusdev.dev.',
  },
  {
    route: 'projects/aprende-con-jesus-dev',
    title: 'Aprende con Jesús Dev | Plataforma educativa de programación',
    description: 'Plataforma educativa pública con 3 lenguajes, 9 niveles, 210 lecciones, 114 ejercicios y 450 preguntas con práctica aislada en el navegador.',
    image: 'https://jesusdev.dev/assets/AprendeConJesusDev/aprende-home-desktop.webp',
    type: 'article',
  },
  {
    route: 'projects/focusflow',
    title: 'FocusFlow | Proyecto Angular PWA | Jesús Martínez Escobar',
    description: 'Detalle de FocusFlow, una PWA Angular para sesiones de foco, prioridades y revisión de progreso.',
    image: 'https://jesusdev.dev/assets/Focus-Flow/focusflow-desktop.webp',
    type: 'article',
  },
  {
    route: 'projects/connectingdevs',
    title: 'ConnectingDevs | Plataforma Full Stack | Jesús Martínez Escobar',
    description: 'Detalle de ConnectingDevs, red Full Stack para perfiles developer con Angular, Laravel y PostgreSQL.',
    image: 'https://jesusdev.dev/assets/Connectingdevs/connectingdevs_feed.webp',
    type: 'article',
  },
  {
    route: 'projects/gibora',
    title: 'GIBORA | E-commerce Laravel | Jesús Martínez Escobar',
    description: 'Detalle de GIBORA, e-commerce Laravel y Filament en fase final antes de despliegue público.',
    type: 'article',
  },
  {
    route: 'projects/pegasus-medical',
    title: 'Pegasus Medical | Proyecto interno Laravel RFID | Jesús Martínez Escobar',
    description: 'Resumen técnico de Pegasus Medical, proyecto interno con Laravel, Filament, MySQL, RFID y Metabase sin información privada.',
    type: 'article',
  },
];

if (!existsSync(indexPath)) {
  throw new Error(`Cannot create GitHub Pages SPA fallback. Missing ${indexPath}`);
}

copyFileSync(indexPath, fallbackPath);
console.log(`Created SPA fallback: ${fallbackPath}`);

const indexHtml = readFileSync(indexPath, 'utf8');

for (const entry of directRoutes) {
  const { route } = entry;
  const routeDirectory = join(browserOutputPath, route);
  const routeIndexPath = join(routeDirectory, 'index.html');

  mkdirSync(routeDirectory, { recursive: true });
  writeFileSync(routeIndexPath, routeHtml(indexHtml, entry));
  console.log(`Created direct route entry: ${routeIndexPath}`);
}

writeFileSync(nojekyllPath, '');
console.log(`Created GitHub Pages marker: ${nojekyllPath}`);

function routeHtml(html, entry) {
  const url = `https://jesusdev.dev/${entry.route}`;
  const image = entry.image ?? defaultImage;
  const type = entry.type ?? 'website';

  return html
    .replace(/\s*<script id="json-ld-profile" type="application\/ld\+json">[\s\S]*?<\/script>/, '')
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(entry.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(entry.description)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(entry.title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(entry.description)}">`)
    .replace(/<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${type}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`)
    .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${image}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${escapeHtml(entry.title)}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapeHtml(entry.description)}">`)
    .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${image}">`);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
