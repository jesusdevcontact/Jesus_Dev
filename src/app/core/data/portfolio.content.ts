import { JourneyItem, NavItem, Project, TechCategory } from '../models/portfolio.models';

export const navItems: NavItem[] = [
  { labelKey: 'nav.about', target: 'about' },
  { labelKey: 'nav.stack', target: 'stack' },
  { labelKey: 'nav.projects', target: 'projects' },
  { labelKey: 'nav.journey', target: 'journey' },
  { labelKey: 'nav.contact', target: 'contact' },
];

export const techCategories: TechCategory[] = [
  {
    key: 'frontend',
    accent: 'cyan',
  },
  {
    key: 'backend',
    accent: 'green',
  },
  {
    key: 'testing',
    accent: 'amber',
  },
  {
    key: 'devops',
    accent: 'rose',
  },
  {
    key: 'tooling',
    accent: 'blue',
  },
];

export const projects: Project[] = [
  {
    key: 'focusFlow',
    name: 'FocusFlow',
    stack: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'Vitest'],
    accent: 'cyan',
    githubUrl: 'https://github.com/jesusdev98/focusflow',
    demoUrl: '#',
  },
  {
    key: 'gibora',
    name: 'GIBORA',
    stack: ['Laravel', 'PHP', 'Filament', 'MySQL', 'Docker'],
    accent: 'green',
    githubUrl: 'https://github.com/jesusdev98/gibora',
    demoUrl: '#',
  },
  {
    key: 'devConnect',
    name: 'DevConnect',
    stack: ['Angular', 'Laravel', 'PHP', 'MySQL', 'Cypress'],
    accent: 'amber',
    githubUrl: 'https://github.com/jesusdev98/devconnect',
    demoUrl: '#',
  },
];

export const journeyItems: JourneyItem[] = [
  { key: 'daw' },
  { key: 'pegasus' },
  { key: 'progression' },
];
