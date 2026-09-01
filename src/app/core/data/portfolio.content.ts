import { JourneyItem, NavItem, Project, SocialLinks, TechCategory } from '../models/portfolio.models';

export const socialLinks: SocialLinks = {
  github: 'https://github.com/jesusdev98',
  linkedin: 'https://linkedin.com/in/jesus-martinez-escobar-223722374',
};

export const navItems: NavItem[] = [
  { labelKey: 'nav.projects', target: 'projects' },
  { labelKey: 'nav.stack', target: 'stack' },
  { labelKey: 'nav.about', target: 'about' },
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

const focusFlowScreenshots = [
  {
    src: 'assets/Focus-Flow/focusflow-desktop.webp',
    avifSrc: 'assets/Focus-Flow/focusflow-desktop.avif',
    thumbnailSrc: 'assets/Focus-Flow/thumbs/focusflow-desktop.webp',
    thumbnailAvifSrc: 'assets/Focus-Flow/thumbs/focusflow-desktop.avif',
    altKey: 'projects.screenshots.focusFlow.desktop',
    width: 1582,
    height: 1327,
    variant: 'desktop',
  },
  {
    src: 'assets/Focus-Flow/focusflow-web.webp',
    avifSrc: 'assets/Focus-Flow/focusflow-web.avif',
    thumbnailSrc: 'assets/Focus-Flow/thumbs/focusflow-web.webp',
    thumbnailAvifSrc: 'assets/Focus-Flow/thumbs/focusflow-web.avif',
    altKey: 'projects.screenshots.focusFlow.web',
    width: 1726,
    height: 957,
    variant: 'web',
  },
  {
    src: 'assets/Focus-Flow/focusflow-mobile-pwa.webp',
    avifSrc: 'assets/Focus-Flow/focusflow-mobile-pwa.avif',
    thumbnailSrc: 'assets/Focus-Flow/thumbs/focusflow-mobile-pwa.webp',
    thumbnailAvifSrc: 'assets/Focus-Flow/thumbs/focusflow-mobile-pwa.avif',
    altKey: 'projects.screenshots.focusFlow.mobile',
    width: 716,
    height: 1536,
    variant: 'mobile',
  },
] satisfies Project['screenshots'];

const connectingDevsScreenshots = [
  {
    src: 'assets/Connectingdevs/connectingdevs_feed.webp',
    avifSrc: 'assets/Connectingdevs/connectingdevs_feed.avif',
    thumbnailSrc: 'assets/Connectingdevs/thumbs/connectingdevs_feed.webp',
    thumbnailAvifSrc: 'assets/Connectingdevs/thumbs/connectingdevs_feed.avif',
    altKey: 'projects.screenshots.devConnect.feed',
    width: 1897,
    height: 970,
    variant: 'web',
  },
  {
    src: 'assets/Connectingdevs/connectingdevs_login.webp',
    avifSrc: 'assets/Connectingdevs/connectingdevs_login.avif',
    thumbnailSrc: 'assets/Connectingdevs/thumbs/connectingdevs_login.webp',
    thumbnailAvifSrc: 'assets/Connectingdevs/thumbs/connectingdevs_login.avif',
    altKey: 'projects.screenshots.devConnect.login',
    width: 1887,
    height: 980,
    variant: 'web',
  },
  {
    src: 'assets/Connectingdevs/connectingdevs_profile.webp',
    avifSrc: 'assets/Connectingdevs/connectingdevs_profile.avif',
    thumbnailSrc: 'assets/Connectingdevs/thumbs/connectingdevs_profile.webp',
    thumbnailAvifSrc: 'assets/Connectingdevs/thumbs/connectingdevs_profile.avif',
    altKey: 'projects.screenshots.devConnect.profile',
    width: 1893,
    height: 963,
    variant: 'web',
  },
  {
    src: 'assets/Connectingdevs/connectingdevs_profile2.webp',
    avifSrc: 'assets/Connectingdevs/connectingdevs_profile2.avif',
    thumbnailSrc: 'assets/Connectingdevs/thumbs/connectingdevs_profile2.webp',
    thumbnailAvifSrc: 'assets/Connectingdevs/thumbs/connectingdevs_profile2.avif',
    altKey: 'projects.screenshots.devConnect.profileDetails',
    width: 1897,
    height: 973,
    variant: 'web',
  },
] satisfies Project['screenshots'];

export const projects: Project[] = [
  {
    key: 'aprendeConJesusDev',
    slug: 'aprende-con-jesus-dev',
    name: 'Aprende con Jesús Dev',
    category: 'educational',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Playwright', 'GitHub Actions', 'Vercel', 'Pyodide'],
    featuredStack: ['Next.js', 'React', 'TypeScript', 'Playwright'],
    accent: 'green',
    status: 'public',
    githubUrl: 'https://github.com/jesusdev98/fundamentos_de_programacion',
    demoUrl: 'https://aprendeconjesusdev.vercel.app',
  },
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
    coverImage: focusFlowScreenshots[0],
    screenshots: focusFlowScreenshots,
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
    coverImage: connectingDevsScreenshots[0],
    screenshots: connectingDevsScreenshots,
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
