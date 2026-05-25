export interface NavItem {
  labelKey: string;
  target: string;
}

export interface TechCategory {
  key: 'frontend' | 'backend' | 'testing' | 'devops' | 'tooling';
  accent: 'cyan' | 'green' | 'amber' | 'rose' | 'blue';
}

export interface Project {
  key: 'focusFlow' | 'gibora' | 'devConnect';
  name: string;
  stack: string[];
  accent: 'cyan' | 'green' | 'amber';
  githubUrl: string;
  demoUrl: string;
}

export interface JourneyItem {
  key: 'daw' | 'pegasus' | 'progression';
}
