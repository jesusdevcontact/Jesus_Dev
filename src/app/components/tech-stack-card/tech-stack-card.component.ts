import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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
  readonly expanded = input(false);
  readonly toggled = output<TechCategory['key']>();

  panelId(): string {
    return `tech-panel-${this.category().key}`;
  }

  triggerId(): string {
    return `tech-trigger-${this.category().key}`;
  }

  toggle(): void {
    this.toggled.emit(this.category().key);
  }

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
      html5: 'HTML',
      css3: 'CSS',
      rxjs: 'Rx',
      scss: 'Sc',
      react: 'Re',
      javascript: 'JS',
      laravel: 'Lv',
      php: 'PHP',
      mysql: 'SQL',
      postgresql: 'Pg',
      'rest-apis': 'API',
      'api-rest': 'API',
      filament: 'Fi',
      python: 'Py',
      java: 'Ja',
      docker: 'D',
      vercel: 'Vc',
      railway: 'Rw',
      'github-actions': 'GH',
      'github-pages': 'GH',
      git: 'Git',
      ssh: 'SSH',
      cypress: 'Cy',
      vitest: 'Vi',
      phpunit: 'PU',
      'unit-testing': 'Unit',
      'testing-unitario': 'Unit',
      'tests-unitaires': 'Unit',
      'e2e-testing': 'E2E',
      'testing-e2e': 'E2E',
      'tests-e2e': 'E2E',
      accessibility: 'A11y',
      linux: 'Lx',
      github: 'GH',
      postman: 'Pm',
      metabase: 'Mb',
      'vs-code': 'VS',
      'openai-codex': 'AI',
      'claude-code': 'Cl',
      'ai-assisted-development': 'AI',
      'ia-aplicada-al-desarrollo': 'AI',
      'ia-appliquee-au-developpement': 'AI',
      'apis-rest': 'API',
      spa: 'SPA',
      'arquitectura-spa': 'SPA',
      'architecture-spa': 'SPA',
      'component-architecture': 'Cmp',
      'arquitectura-por-componentes': 'Cmp',
      'architecture-par-composants': 'Cmp',
      'responsive-design': 'RWD',
      'diseno-responsive': 'RWD',
      'design-responsive': 'RWD',
      'relational-modeling': 'SQL',
      'modelado-relacional': 'SQL',
      'modelisation-relationnelle': 'SQL',
    };

    return marks[this.techSlug(item)] ?? item.slice(0, 2);
  }
}
