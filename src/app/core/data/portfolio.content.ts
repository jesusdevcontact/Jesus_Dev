import { JourneyItem, NavItem, Project, TechCategory } from '../models/portfolio.models';

export const navItems: NavItem[] = [
  { label: 'About', target: 'about' },
  { label: 'Stack', target: 'stack' },
  { label: 'Projects', target: 'projects' },
  { label: 'Journey', target: 'journey' },
  { label: 'Contact', target: 'contact' },
];

export const techCategories: TechCategory[] = [
  {
    title: 'Frontend',
    summary: 'Angular interfaces with component boundaries, typed data flow, responsive SCSS, and accessible interaction states.',
    items: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'SCSS', 'HTML5', 'Responsive UI', 'A11y'],
    accent: 'cyan',
  },
  {
    title: 'Backend',
    summary: 'Laravel and PHP foundations for REST APIs, relational data, validation rules, authentication, and admin workflows.',
    items: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'Eloquent', 'Filament', 'Validation', 'Auth'],
    accent: 'green',
  },
  {
    title: 'Testing',
    summary: 'Risk-based testing habits: cover state transitions, user flows, validation paths, and regressions that affect users.',
    items: ['Cypress', 'Vitest', 'Angular Testing', 'Feature Specs', 'Mocking', 'A11y Checks'],
    accent: 'amber',
  },
  {
    title: 'DevOps',
    summary: 'Production-minded workflows with repeatable builds, environment separation, version control, and CI preparation.',
    items: ['Docker', 'GitHub Actions', 'Git', 'CI Checks', 'Environment Config', 'Build Budgets'],
    accent: 'rose',
  },
  {
    title: 'Tooling',
    summary: 'Tooling choices aimed at fast feedback, clean debugging, maintainable folders, and readable handoff for teams.',
    items: ['Vite', 'Angular CLI', 'VS Code', 'npm', 'Figma Handoff', 'Chrome DevTools'],
    accent: 'blue',
  },
];

export const projects: Project[] = [
  {
    name: 'FocusFlow',
    type: 'Angular productivity workspace',
    summary:
      'A focused planning interface for turning daily work into structured sessions, visible priorities, and predictable progress.',
    problem:
      'The project solves the common friction of scattered tasks and unfocused work sessions by grouping planning, focus state, and progress review in one clean interface.',
    stack: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'Vitest'],
    decisions: [
      'Modeled the UI around small standalone components so session controls, task lists, and progress panels can evolve independently.',
      'Kept state transitions explicit with typed models instead of hiding behavior in template-only logic.',
      'Used SCSS tokens and reusable surface patterns to keep the dashboard consistent across desktop and mobile.',
    ],
    architecture: [
      'Feature-first Angular structure',
      'Typed session and task state',
      'Reusable dashboard cards',
      'Responsive grid layout',
    ],
    quality: [
      'Vitest-ready state utilities',
      'Keyboard-visible focus states',
      'Reduced-motion friendly reveals',
      'Performance-conscious lazy route',
    ],
    impact: ['Shows Angular UI architecture', 'Explains product thinking', 'Demonstrates testable state'],
    accent: 'cyan',
    githubUrl: 'https://github.com/jesusdev98/focusflow',
    demoUrl: '#',
  },
  {
    name: 'GIBORA',
    type: 'Laravel operations platform',
    summary:
      'An operations-style management platform for inventory visibility, access-controlled workflows, and reliable admin data entry.',
    problem:
      'GIBORA is designed around the kind of operational data teams need to keep consistent: stock records, user permissions, and repeatable management workflows.',
    stack: ['Laravel', 'PHP', 'Filament', 'MySQL', 'Docker'],
    decisions: [
      'Used Laravel to keep validation, database access, and business rules close to the backend domain model.',
      'Chose Filament-style admin patterns for fast, consistent CRUD screens without sacrificing backend structure.',
      'Designed relational tables around clear ownership and future auditability rather than flat, hard-to-query records.',
    ],
    architecture: [
      'Laravel domain models',
      'MySQL relational schema',
      'Admin panel workflows',
      'Docker-ready environment',
    ],
    quality: [
      'Backend validation paths',
      'Permission-aware screens',
      'Repeatable local setup',
      'Clear error handling targets',
    ],
    impact: ['Shows Laravel fundamentals', 'Connects UI to data modeling', 'Production workflow awareness'],
    accent: 'green',
    githubUrl: 'https://github.com/jesusdev98/gibora',
    demoUrl: '#',
  },
  {
    name: 'DevConnect',
    type: 'Fullstack developer network',
    summary:
      'A fullstack community application for developer profiles, knowledge sharing, authentication, and API-driven collaboration.',
    problem:
      'The project explores how to build a social product without losing technical clarity: user identity, profile data, interactions, and API boundaries all need to stay understandable.',
    stack: ['Angular', 'Laravel', 'PHP', 'MySQL', 'Cypress'],
    decisions: [
      'Separated Angular UI concerns from Laravel API responsibilities so each layer can be tested and changed independently.',
      'Planned authentication and profile flows around explicit states: logged out, onboarding, authenticated, and error recovery.',
      'Kept API responses shaped for frontend consumption while still respecting relational backend structure.',
    ],
    architecture: [
      'Angular frontend shell',
      'Laravel REST API',
      'MySQL user/profile data',
      'Route-level feature boundaries',
    ],
    quality: [
      'Cypress flow coverage target',
      'Accessible form feedback',
      'Loading and empty states',
      'API error-state planning',
    ],
    impact: ['Shows fullstack progression', 'Demonstrates API thinking', 'Interview-ready system design'],
    accent: 'amber',
    githubUrl: 'https://github.com/jesusdev98/devconnect',
    demoUrl: '#',
  },
];

export const journeyItems: JourneyItem[] = [
  {
    year: 'DAW',
    title: 'DAW studies: practical fullstack foundations',
    summary:
      'Built a working base across frontend structure, backend logic, relational databases, version control, and the discipline needed to explain technical choices clearly.',
    details: ['Angular and TypeScript fundamentals', 'PHP and Laravel backend practice', 'MySQL modeling and SQL reasoning'],
  },
  {
    year: 'Internship',
    title: 'Pegasus Medical internship',
    summary:
      'Worked in a real operational context where software decisions connect to inventory, access control, healthcare workflows, and the need for clear, reliable data handling.',
    details: ['RFID and stock-management context', 'Laravel/Filament admin workflow exposure', 'Production constraints, privacy, and traceability awareness'],
  },
  {
    year: 'Now',
    title: 'Fullstack progression',
    summary:
      'Progressing from building features to thinking like a team developer: define boundaries, test risky behavior, document tradeoffs, and make interfaces usable under real conditions.',
    details: ['Reusable Angular architecture', 'Risk-based testing mindset', 'Performance, accessibility, and deployment readiness'],
  },
];
