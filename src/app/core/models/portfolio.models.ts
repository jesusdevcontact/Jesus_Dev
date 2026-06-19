export interface NavItem {
  labelKey: string;
  target: string;
}

export interface TechCategory {
  key: 'frontend' | 'backend' | 'testing' | 'architecture' | 'devops' | 'tooling';
  accent: 'cyan' | 'green' | 'amber' | 'rose' | 'blue';
}

export type TechCategoryKey = TechCategory['key'];

export interface ProjectScreenshot {
  src: string;
  alt: string;
  variant: 'desktop' | 'web' | 'mobile';
}

export interface Project {
  key: 'focusFlow' | 'devConnect' | 'gibora' | 'pegasusMedical';
  name: string;
  stack: string[];
  accent: 'cyan' | 'green' | 'amber';
  githubUrl?: string;
  demoUrl?: string;
  screenshots?: ProjectScreenshot[];
}

export interface JourneyItem {
  key: 'daw' | 'pegasus' | 'progression';
}
