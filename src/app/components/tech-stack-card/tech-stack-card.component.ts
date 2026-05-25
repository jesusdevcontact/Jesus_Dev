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
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#101218"/><path fill="none" stroke="#f7f8fb" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M12 4.45c1.25 0 2.23.62 2.82 1.6 1.12-.14 2.19.23 2.98 1.08.9.96 1.14 2.25.72 3.4.77.84.98 2.05.6 3.17-.42 1.25-1.4 2.05-2.57 2.27-.36 1.07-1.23 1.93-2.38 2.24-1.27.34-2.51-.03-3.34-.85-1.1.23-2.24-.07-3.1-.9-.95-.9-1.26-2.18-.94-3.36-.86-.77-1.22-1.96-.92-3.12.32-1.29 1.26-2.2 2.4-2.55.43-1.1 1.42-1.95 2.66-2.16.37-.06.73-.06 1.07-.02Z"/><path fill="none" stroke="#f7f8fb" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" d="M8.26 7.43 12 9.57l3.73-2.14M8.26 16.47v-4.28L12 10m3.73 6.47v-4.28L12 10m0 8.55v-4.28l3.73-2.08M12 18.55l-3.74-2.08"/></svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  private claudeIcon(): string {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#19110d"/><path fill="#d97757" d="m12 3.2 1.45 5.35 4.7-2.93-2.93 4.7L20.8 12l-5.58 1.68 2.93 4.7-4.7-2.93L12 20.8l-1.45-5.35-4.7 2.93 2.93-4.7L3.2 12l5.58-1.68-2.93-4.7 4.7 2.93L12 3.2Z"/><path fill="#f2c0a4" d="M12 7.25 13.05 11H17l-3.2 2.28 1.22 3.67L12 14.7l-3.02 2.25 1.22-3.67L7 11h3.95L12 7.25Z"/></svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
}
