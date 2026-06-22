export interface NavItem {
  labelKey: string;
  target: string;
}

export interface TechCategory {
  key: 'frontend' | 'backend' | 'databases' | 'testing' | 'architecture' | 'devops' | 'tooling';
  accent: 'cyan' | 'green' | 'amber' | 'rose' | 'blue';
}

export type TechCategoryKey = TechCategory['key'];

export type TechIcon =
  | {
      type: 'asset';
      path: string;
    }
  | {
      type: 'lucide';
      name: string;
    };

export interface ProjectScreenshot {
  src: string;
  alt: string;
  variant: 'desktop' | 'web' | 'mobile';
}

export type ProjectKey = 'focusFlow' | 'devConnect' | 'gibora' | 'pegasusMedical';

export type ProjectStatus = 'pendingDeployment' | 'internal';

export interface Project {
  key: ProjectKey;
  slug: 'focusflow' | 'connectingdevs' | 'gibora' | 'pegasus-medical';
  name: string;
  category: 'pwa' | 'fullStack' | 'ecommerce' | 'internal' | 'collaborative';
  stack: string[];
  featuredStack: string[];
  accent: 'cyan' | 'green' | 'amber';
  status?: ProjectStatus;
  githubUrl?: string;
  demoUrl?: string;
  coverImage?: ProjectScreenshot;
  screenshots?: ProjectScreenshot[];
}

export interface JourneyItem {
  key: 'pegasus' | 'fitup' | 'daw' | 'physicalConditioning';
  type: 'technicalExperience' | 'managementExperience' | 'technicalEducation' | 'previousEducation';
  icon: 'database' | 'workflow' | 'code-2' | 'check-circle-2';
  accent: 'cyan' | 'green' | 'amber' | 'rose';
}

export type JourneyKey = JourneyItem['key'];
