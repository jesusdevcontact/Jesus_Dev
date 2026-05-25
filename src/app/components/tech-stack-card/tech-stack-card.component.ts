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
    const icons: Record<string, string> = {
      angular: 'angular/DD0031',
      typescript: 'typescript/3178C6',
      rxjs: 'reactivex/B7178C',
      scss: 'sass/CC6699',
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
      npm: 'npm/CB3837',
      pnpm: 'pnpm/F69220',
      linux: 'linux/FCC624',
      'vs-code': 'visualstudiocode/007ACC',
      github: 'github/FFFFFF',
      postman: 'postman/FF6C37',
      codex: 'openai/FFFFFF',
    };

    const icon = icons[this.techSlug(item)];

    return icon ? `https://cdn.simpleicons.org/${icon}` : null;
  }

  useIconFallback(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.parentElement?.classList.add('tech-mark--fallback');
  }
}
