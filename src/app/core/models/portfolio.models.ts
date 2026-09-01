export interface NavItem {
  labelKey: string;
  target: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
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
  avifSrc: string;
  thumbnailSrc: string;
  thumbnailAvifSrc: string;
  altKey: string;
  width: number;
  height: number;
  variant: 'desktop' | 'web' | 'mobile';
}

export type ProjectKey = 'aprendeConJesusDev' | 'focusFlow' | 'devConnect' | 'gibora' | 'pegasusMedical';

export type ProjectStatus = 'public' | 'pendingDeployment' | 'internal';

export interface Project {
  key: ProjectKey;
  slug: 'aprende-con-jesus-dev' | 'focusflow' | 'connectingdevs' | 'gibora' | 'pegasus-medical';
  name: string;
  category: 'educational' | 'pwa' | 'fullStack' | 'ecommerce' | 'internal' | 'collaborative';
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

export type ChatbotNodeId =
  | 'welcome'
  | 'projects'
  | 'stack'
  | 'experience'
  | 'availability'
  | 'services'
  | 'contact';

export type ChatbotAction =
  | {
      type: 'node';
      labelKey: string;
      targetNodeId: ChatbotNodeId;
    }
  | {
      type: 'route';
      labelKey: string;
      route: string;
      fragment?: string;
    }
  | {
      type: 'external';
      labelKey: string;
      url: string;
    };

export interface ChatbotNode {
  id: ChatbotNodeId;
  messageKey: string;
  actions: readonly ChatbotAction[];
}
