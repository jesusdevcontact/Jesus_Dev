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
      codex: 'AI',
      'openai-codex': 'AI',
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

}
