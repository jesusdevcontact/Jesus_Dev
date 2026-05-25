export interface NavItem {
  label: string;
  target: string;
}

export interface TechCategory {
  title: string;
  summary: string;
  items: string[];
  accent: 'cyan' | 'green' | 'amber' | 'rose' | 'blue';
}

export interface Project {
  name: string;
  type: string;
  summary: string;
  problem: string;
  stack: string[];
  decisions: string[];
  architecture: string[];
  quality: string[];
  impact: string[];
  accent: 'cyan' | 'green' | 'amber';
  githubUrl: string;
  demoUrl: string;
}

export interface JourneyItem {
  year: string;
  title: string;
  summary: string;
  details: string[];
}
