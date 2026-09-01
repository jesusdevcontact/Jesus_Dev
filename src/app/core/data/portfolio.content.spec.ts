import { routes } from '../../app.routes';
import en from '../../../assets/i18n/en.json';
import es from '../../../assets/i18n/es.json';
import fr from '../../../assets/i18n/fr.json';
import { projects } from './portfolio.content';

describe('published project content', () => {
  it('publishes Aprende con Jesus Dev once with its exact links and typed project contract', () => {
    const matches = projects.filter((project) => project.key === 'aprendeConJesusDev');

    expect(matches).toHaveLength(1);
    expect(projects.map((project) => project.name)).toEqual([
      'Aprende con Jesús Dev',
      'FocusFlow',
      'ConnectingDevs',
      'GIBORA',
      'Pegasus Medical',
    ]);

    const project = matches[0];
    expect(project).toMatchObject({
      slug: 'aprende-con-jesus-dev',
      category: 'educational',
      demoUrl: 'https://aprendeconjesusdev.vercel.app',
      githubUrl: 'https://github.com/jesusdev98/fundamentos_de_programacion',
    });
    expect(project.featuredStack.every((technology) => project.stack.includes(technology))).toBe(true);
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
