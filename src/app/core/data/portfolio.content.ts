import { JourneyItem, NavItem, Project, TechCategory } from '../models/portfolio.models';

export const navItems: NavItem[] = [
  { labelKey: 'nav.about', target: 'about' },
  { labelKey: 'nav.stack', target: 'stack' },
  { labelKey: 'nav.projects', target: 'projects' },
  { labelKey: 'nav.journey', target: 'journey' },
  { labelKey: 'nav.contact', target: '/contact' },
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
    key: 'architecture',
    accent: 'cyan',
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
    demoUrl: 'https://focusflowpwa.vercel.app/',
    screenshots: [
      {
        src: 'assets/Focus-Flow/focusflow-desktop.png',
        alt: 'FocusFlow desktop dashboard screenshot',
        variant: 'desktop',
      },
      {
        src: 'assets/Focus-Flow/focusflow-web.png',
        alt: 'FocusFlow web interface screenshot',
        variant: 'web',
      },
      {
        src: 'assets/Focus-Flow/focusflow-mobile-pwa.png',
        alt: 'FocusFlow mobile interface screenshot',
        variant: 'mobile',
      },
    ],
  },
  {
    key: 'devConnect',
    name: 'ConnectingDevs',
    stack: ['Angular', 'Laravel', 'PHP', 'PostgreSQL', 'Neon', 'Docker', 'Cypress'],
    accent: 'amber',
    githubUrl: 'https://github.com/jesusdev98/devconnect',
    demoUrl: 'https://www.connectingdevs.com',
    screenshots: [
      {
        src: 'assets/Connectingdevs/connectingdevs_feed.png',
        alt: 'ConnectingDevs feed screenshot',
        variant: 'web',
      },
      {
        src: 'assets/Connectingdevs/connectingdevs_login.png',
        alt: 'ConnectingDevs login screenshot',
        variant: 'web',
      },
      {
        src: 'assets/Connectingdevs/connectingdevs_profile.png',
        alt: 'ConnectingDevs profile screenshot',
        variant: 'web',
      },
      {
        src: 'assets/Connectingdevs/connectingdevs_profile2.png',
        alt: 'ConnectingDevs profile details screenshot',
        variant: 'web',
      },
    ],
  },
  {
    key: 'gibora',
    name: 'GIBORA',
    stack: ['Laravel', 'PHP', 'Filament', 'MySQL', 'Docker'],
    accent: 'green',
    githubUrl: 'https://github.com/jesusdev98/gibora',
  },
  {
    key: 'pegasusMedical',
    name: 'Pegasus Medical',
    stack: ['Laravel', 'Filament', 'MySQL', 'RFID', 'Metabase', 'Docker', 'Linux'],
    accent: 'cyan',
  },
];

export const journeyItems: JourneyItem[] = [
  { key: 'daw' },
  { key: 'pegasus' },
  { key: 'progression' },
];
