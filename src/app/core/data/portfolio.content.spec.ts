import { routes } from '../../app.routes';
import en from '../../../assets/i18n/en.json';
import es from '../../../assets/i18n/es.json';
import fr from '../../../assets/i18n/fr.json';
import { projects } from './portfolio.content';

describe('published project content', () => {
  it('publishes the AI-assisted migrator without inventing a public demo', () => {
    const matches = projects.filter((project) => String(project.key) === 'aiMigrator');
    expect(matches).toHaveLength(1);
    const project = matches[0];
    expect(project).toMatchObject({
      slug: 'migrador-bases-de-datos', category: 'fullStack', status: 'public',
      githubUrl: 'https://github.com/jesusdev98/migrador-bases-de-datos',
    });
    expect(project.demoUrl).toBeUndefined();
    expect(project.stack).toEqual(expect.arrayContaining(['React', 'Three.js']));
    expect(project.featuredStack.every((technology) => project.stack.includes(technology))).toBe(true);
    expect(project.coverImage).toBe(project.screenshots?.[0]);
    expect(project.screenshots).toEqual([{
      src: 'assets/MigradorBasesDeDatos/migrator-local-desktop.webp',
      avifSrc: 'assets/MigradorBasesDeDatos/migrator-local-desktop.avif',
      thumbnailSrc: 'assets/MigradorBasesDeDatos/thumbs/migrator-local-desktop.webp',
      thumbnailAvifSrc: 'assets/MigradorBasesDeDatos/thumbs/migrator-local-desktop.avif',
      altKey: 'projects.screenshots.aiMigrator.local',
      width: 1440,
      height: 1000,
      variant: 'web',
    }, ...['mongodb', 'postgresql', 'mariadb'].map((target) => ({
      src: `assets/MigradorBasesDeDatos/migrator-results-${target}.webp`,
      avifSrc: `assets/MigradorBasesDeDatos/migrator-results-${target}.avif`,
      thumbnailSrc: `assets/MigradorBasesDeDatos/thumbs/migrator-results-${target}.webp`,
      thumbnailAvifSrc: `assets/MigradorBasesDeDatos/thumbs/migrator-results-${target}.avif`,
      altKey: `projects.screenshots.aiMigrator.${target}`,
      width: 1440,
      height: 1000,
      variant: 'web',
    }))]);
  });

  it('preserves the existing project identities, links and gallery sizes', () => {
    expect(projects.filter((project) => String(project.key) !== 'aiMigrator').map((project) => [
      project.key, project.slug, project.githubUrl, project.demoUrl, project.screenshots?.length,
    ])).toEqual([
      ['aprendeConJesusDev', 'aprende-con-jesus-dev', 'https://github.com/jesusdev98/fundamentos_de_programacion', 'https://aprendeconjesusdev.vercel.app', 3],
      ['focusFlow', 'focusflow', 'https://github.com/jesusdev98/focusflow', 'https://focusflowpwa.vercel.app/', 3],
      ['devConnect', 'connectingdevs', 'https://github.com/ConnectingDevs/ConnectingDevs-Frontend', 'https://www.connectingdevs.com', 4],
      ['gibora', 'gibora', 'https://github.com/jesusdev98/gibora', undefined, undefined],
      ['pegasusMedical', 'pegasus-medical', undefined, undefined, undefined],
    ]);
  });

  it.each([['es', es], ['en', en], ['fr', fr]])('publishes the migrator case study and future-only roadmap in %s', (_language, translation) => {
    const items = translation.projects.items as unknown as Record<string, typeof translation.projects.items.aprendeConJesusDev>;
    const item = items['aiMigrator'];
    expect(item).toBeDefined();
    expect(Object.keys(item).sort()).toEqual(Object.keys(items['aprendeConJesusDev']).sort());
    expect(item.architecture.join(' ')).toMatch(/Llama 3\.2.*3B.*q4f32/);
    expect(item.architecture.join(' ')).toContain('WebLLM 0.2.87');
    expect(item.architecture.join(' ')).toMatch(/React.*Three\.js/);
    expect(item.media.caption).toContain('Pokédex');
    expect(item.quality.join(' ')).toMatch(/JSON Schema/);
    expect(item.quality.join(' ')).toMatch(/Qwen.*Llama/);
    expect(item.impact.join(' ')).toMatch(/151/);
    expect(item.impact.join(' ')).toMatch(/218/);
    expect(item.impact.join(' ')).toMatch(/PostgreSQL.*MariaDB.*MongoDB/);
    expect(item.deployment).toMatch(/SQLite/);
    expect(item.decisions.join(' ')).toMatch(/MongoDB/);
    expect(item.decisions.join(' ')).toMatch(/(?:Futuro|Future|À venir).*UI/);
    const screenshots = translation.projects.screenshots as unknown as Record<string, Record<string, string>>;
    expect(screenshots['aiMigrator']?.['local']).toMatch(/SQLite/);
    for (const [target, label] of [['mongodb', 'MongoDB'], ['postgresql', 'PostgreSQL'], ['mariadb', 'MariaDB']]) {
      expect(screenshots['aiMigrator']?.[target]).toContain(label);
    }
  });

  it('publishes Aprende con Jesus Dev once with its exact links and typed project contract', () => {
    const matches = projects.filter((project) => project.key === 'aprendeConJesusDev');

    expect(matches).toHaveLength(1);
    expect(projects.map((project) => project.name)).toEqual([
      'Aprende con Jesús Dev',
      'FocusFlow',
      'ConnectingDevs',
      'GIBORA',
      'Pegasus Medical',
      'Migrador de bases de datos con IA',
    ]);

    const project = matches[0];
    expect(project).toMatchObject({
      slug: 'aprende-con-jesus-dev',
      category: 'educational',
      demoUrl: 'https://aprendeconjesusdev.vercel.app',
      githubUrl: 'https://github.com/jesusdev98/fundamentos_de_programacion',
    });
    expect(project.featuredStack.every((technology) => project.stack.includes(technology))).toBe(true);
    expect(project.coverImage).toBe(project.screenshots?.[0]);
    expect(project.screenshots?.map((screenshot) => screenshot.variant)).toEqual(['web', 'web', 'mobile']);
    expect(project.screenshots?.map((screenshot) => screenshot.altKey)).toEqual([
      'projects.screenshots.aprendeConJesusDev.home',
      'projects.screenshots.aprendeConJesusDev.learning',
      'projects.screenshots.aprendeConJesusDev.mobile',
    ]);
  });

  it('uses the generic project route instead of a literal Aprende route', () => {
    expect(routes.filter((route) => route.path === 'projects/:slug')).toHaveLength(1);
    expect(routes.some((route) => route.path?.includes('aprende-con-jesus-dev'))).toBe(false);
  });

  it.each([
    ['es', es],
    ['en', en],
    ['fr', fr],
  ])('keeps the Aprende project i18n contract in %s', (_language, translation) => {
    const item = translation.projects.items.aprendeConJesusDev;

    expect(translation.projects.categories.educational).toBeTruthy();
    expect(translation.projects.labels.impact).toBeTruthy();
    expect(Object.keys(item).sort()).toEqual([
      'architecture',
      'decisions',
      'deployment',
      'impact',
      'media',
      'problem',
      'quality',
      'seoDescription',
      'seoTitle',
      'shortDescription',
      'solution',
      'summary',
      'type',
    ]);
    expect(item.decisions.length).toBeGreaterThan(0);
    expect(item.architecture.length).toBeGreaterThan(0);
    expect(item.quality.length).toBeGreaterThan(0);
    expect(item.impact.join(' ')).toMatch(/3/);
    expect(item.impact.join(' ')).toMatch(/9/);
    expect(item.impact.join(' ')).toMatch(/210/);
    expect(item.impact.join(' ')).toMatch(/114/);
    expect(item.impact.join(' ')).toMatch(/450/);
  });
});
