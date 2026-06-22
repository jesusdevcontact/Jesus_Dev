import { JourneyItem, NavItem, Project, SocialLinks, TechCategory } from '../models/portfolio.models';

export const socialLinks: SocialLinks = {
  github: 'https://github.com/jesusdev98',
  linkedin: 'https://linkedin.com/in/jesus-martinez-escobar-223722374',
};

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
    key: 'databases',
    accent: 'amber',
  },
  {
    key: 'testing',
    accent: 'rose',
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
    slug: 'focusflow',
    name: 'FocusFlow',
    category: 'pwa',
    stack: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'Vitest'],
    featuredStack: ['Angular', 'TypeScript', 'RxJS', 'SCSS'],
    accent: 'cyan',
    githubUrl: 'https://github.com/jesusdev98/focusflow',
    demoUrl: 'https://focusflowpwa.vercel.app/',
    coverImage: {
      src: 'assets/Focus-Flow/focusflow-desktop.png',
      alt: 'FocusFlow desktop dashboard screenshot',
      variant: 'desktop',
    },
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
    slug: 'connectingdevs',
    name: 'ConnectingDevs',
    category: 'collaborative',
    stack: ['Angular', 'Laravel', 'PHP', 'PostgreSQL', 'Neon', 'Docker', 'Cypress'],
    featuredStack: ['Angular', 'Laravel', 'PostgreSQL', 'Cypress'],
    accent: 'amber',
    githubUrl: 'https://github.com/ConnectingDevs/ConnectingDevs-Frontend',
    demoUrl: 'https://www.connectingdevs.com',
    coverImage: {
      src: 'assets/Connectingdevs/connectingdevs_feed.png',
      alt: 'ConnectingDevs feed screenshot',
      variant: 'web',
    },
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
    slug: 'gibora',
    name: 'GIBORA',
    category: 'ecommerce',
    stack: ['Laravel', 'PHP', 'Filament', 'MySQL', 'Docker'],
    featuredStack: ['Laravel', 'PHP', 'Filament', 'MySQL'],
    accent: 'green',
    status: 'pendingDeployment',
    githubUrl: 'https://github.com/jesusdev98/gibora',
  },
  {
    key: 'pegasusMedical',
    slug: 'pegasus-medical',
    name: 'Pegasus Medical',
    category: 'internal',
    stack: ['Laravel', 'Filament', 'MySQL', 'RFID', 'Metabase', 'Docker', 'Linux'],
    featuredStack: ['Laravel', 'Filament', 'MySQL', 'RFID'],
    accent: 'cyan',
    status: 'internal',
  },
];

export const journeyItems: JourneyItem[] = [
  {
    key: 'pegasus',
    type: 'technicalExperience',
    icon: 'database',
    accent: 'cyan',
  },
  {
    key: 'fitup',
    type: 'managementExperience',
    icon: 'workflow',
    accent: 'green',
  },
  {
    key: 'daw',
    type: 'technicalEducation',
    icon: 'code-2',
    accent: 'amber',
  },
  {
    key: 'physicalConditioning',
    type: 'previousEducation',
    icon: 'check-circle-2',
    accent: 'rose',
  },
];
