import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

import { TechCategory } from '../../core/models/portfolio.models';
import { TranslateArrayPipe } from '../../shared/pipes/translate-array.pipe';

@Component({
  selector: 'jd-tech-stack-card',
  standalone: true,
  imports: [NgClass, LucideDynamicIcon, TranslatePipe, TranslateArrayPipe],
  templateUrl: './tech-stack-card.component.html',
  styleUrl: './tech-stack-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackCardComponent {
  readonly category = input.required<TechCategory>();

  iconFor(key: string): string {
    const icons: Record<string, string> = {
      frontend: 'code-2',
      backend: 'database',
      testing: 'shield-check',
      architecture: 'workflow',
      devops: 'workflow',
      tooling: 'terminal',
    };

    return icons[key] ?? 'code-2';
  }

  techSlug(item: string): string {
    return item
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\+/g, 'plus')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  techMark(item: string): string {
    const marks: Record<string, string> = {
      angular: 'A',
      typescript: 'TS',
      rxjs: 'Rx',
      scss: 'Sc',
      laravel: 'Lv',
      php: 'PHP',
      mysql: 'SQL',
      postgresql: 'Pg',
      neon: 'Ne',
      sanctum: 'Sa',
      docker: 'D',
      vercel: 'Vc',
      railway: 'Rw',
      'github-actions': 'GH',
      cypress: 'Cy',
      vitest: 'Vi',
      karma: 'Ka',
      phpunit: 'PU',
      accessibility: 'A11y',
      'e2e-testing': 'E2E',
      'unit-testing': 'Unit',
      npm: 'npm',
      pnpm: 'pn',
      linux: 'Lx',
      vite: 'V',
      github: 'GH',
      postman: 'Pm',
      'vs-code': 'VS',
      codex: 'Cx',
      'claude-code': 'Cl',
      'rest-apis': 'API',
      'apis-rest': 'API',
      'spa-architecture': 'SPA',
      'arquitectura-spa': 'SPA',
      'architecture-spa': 'SPA',
      'api-ui-boundaries': 'API',
      'limites-api-ui': 'API',
      'frontieres-api-ui': 'API',
      'auth-flows': 'Auth',
      'flujos-auth': 'Auth',
      'flux-auth': 'Auth',
      'relational-modeling': 'SQL',
      'modelado-relacional': 'SQL',
      'modelisation-relationnelle': 'SQL',
      'testing-workflows': 'Test',
      'flujos-de-testing': 'Test',
      'workflows-de-test': 'Test',
      'ci-cd-mindset': 'CI',
      'mentalidad-ci-cd': 'CI',
      'culture-ci-cd': 'CI',
      'feature-architecture': 'Feat',
      'feature-driven-architecture': 'Feat',
      'arquitectura-por-features': 'Feat',
      'architecture-par-feature': 'Feat',
      'angular-testing': 'Ng',
      'pruebas-angular': 'Ng',
      'tests-angular': 'Ng',
      'a11y-checks': 'A11y',
      'revision-a11y': 'A11y',
      'controles-a11y': 'A11y',
      filament: 'Fi',
      'angular-cli': 'CLI',
      'chrome-devtools': 'Dev',
    };

    return marks[this.techSlug(item)] ?? item.slice(0, 2);
  }

  techIconUrl(item: string): string | null {
    const customIcons: Record<string, string> = {
      sanctum: this.sanctumIcon(),
      codex: this.codexIcon(),
      'claude-code': this.claudeIcon(),
    };
    const icons: Record<string, string> = {
      angular: 'angular/DD0031',
      typescript: 'typescript/3178C6',
      rxjs: 'reactivex/B7178C',
      scss: 'sass/CC6699',
      vite: 'vite/646CFF',
      laravel: 'laravel/FF2D20',
      php: 'php/777BB4',
      mysql: 'mysql/4479A1',
      postgresql: 'postgresql/4169E1',
      neon: 'neon/00E599',
      docker: 'docker/2496ED',
      railway: 'railway/FFFFFF',
      vercel: 'vercel/FFFFFF',
      'github-actions': 'githubactions/2088FF',
      cypress: 'cypress/69D3A7',
      vitest: 'vitest/6E9F18',
      karma: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/karma/karma-original.svg',
      phpunit: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/phpunit/phpunit-original.svg',
      npm: 'npm/CB3837',
      pnpm: 'pnpm/F69220',
      linux: 'linux/FCC624',
      'vs-code': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
      github: 'github/FFFFFF',
      postman: 'postman/FF6C37',
    };

    const slug = this.techSlug(item);
    const customIcon = customIcons[slug];
    const icon = icons[slug];

    if (customIcon) {
      return customIcon;
    }
    if (!icon) {
      return null;
    }

    return icon.startsWith('http') ? icon : `https://cdn.simpleicons.org/${icon}`;
  }

  useIconFallback(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.parentElement?.classList.add('tech-mark--fallback');
  }

  private sanctumIcon(): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#ff2d20"/><path fill="#fff" d="M12 3.4 18.7 6v5.25c0 4.15-2.66 7.88-6.7 9.35-4.04-1.47-6.7-5.2-6.7-9.35V6L12 3.4Z"/><path fill="#ff2d20" d="M12 6.05 15.95 7.6v3.55c0 2.35-1.48 4.56-3.95 5.78-2.47-1.22-3.95-3.43-3.95-5.78V7.6L12 6.05Z"/><path fill="#fff" d="M10.24 12.98c.48.55 1.05.83 1.72.83.55 0 .98-.17 1.3-.5.3-.32.46-.72.46-1.2 0-.47-.16-.86-.49-1.17-.32-.31-.78-.47-1.38-.47-.62 0-1.2.18-1.74.55l-.83-.74.4-3.1h5.1v1.55h-3.76l-.13.92c.4-.2.84-.3 1.32-.3.95 0 1.7.25 2.27.76.58.5.86 1.15.86 1.96 0 .88-.31 1.62-.94 2.2-.62.59-1.43.88-2.42.88-1.16 0-2.1-.42-2.82-1.25l1.12-.92Z"/></svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  private codexIcon(): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="#dce2ec" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" d="M12 4.75c1.18 0 2.08.56 2.62 1.45 1.05-.12 2.02.24 2.74 1.02.8.86 1.03 2.04.66 3.1.7.78.9 1.88.55 2.9-.38 1.13-1.28 1.86-2.36 2.06-.34.98-1.14 1.76-2.18 2.04-1.16.31-2.3-.03-3.05-.78-1.02.2-2.07-.08-2.85-.84-.86-.83-1.15-2-.86-3.08-.78-.71-1.1-1.8-.84-2.86.3-1.17 1.16-2 2.2-2.32.4-1.02 1.3-1.78 2.43-1.98.33-.05.65-.05.94-.01Z"/><path fill="none" stroke="#dce2ec" stroke-width="1.18" stroke-linecap="round" stroke-linejoin="round" d="M8.7 7.72 12 9.62l3.3-1.9M8.7 16.07v-3.82L12 10.3m3.3 5.77v-3.82L12 10.3m0 7.58v-3.8l3.3-1.83M12 17.88l-3.3-1.81"/></svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  private claudeIcon(): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#d97757" d="m12 4.05 1.26 4.72 4.08-2.58-2.55 4.1L19.7 12l-4.91 1.71 2.55 4.1-4.08-2.58L12 19.95l-1.26-4.72-4.08 2.58 2.55-4.1L4.3 12l4.91-1.71-2.55-4.1 4.08 2.58L12 4.05Z"/><path fill="#e9a47f" d="M12 7.8 12.9 11h3.35l-2.72 1.96 1.04 3.16L12 14.17l-2.57 1.95 1.04-3.16L7.75 11h3.35L12 7.8Z"/></svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
}
