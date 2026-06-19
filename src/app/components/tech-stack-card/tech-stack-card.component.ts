import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

import { TechCategory, TechIcon } from '../../core/models/portfolio.models';
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
      backend: 'server-cog',
      databases: 'database',
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

  techIcon(item: string): TechIcon {
    const icons: Record<string, TechIcon> = {
      angular: { type: 'lucide', name: 'component' },
      typescript: { type: 'lucide', name: 'file-code-2' },
      html5: { type: 'lucide', name: 'file-code' },
      css3: { type: 'lucide', name: 'palette' },
      scss: { type: 'lucide', name: 'paintbrush' },
      rxjs: { type: 'lucide', name: 'radio-tower' },
      react: { type: 'lucide', name: 'atom' },
      javascript: { type: 'lucide', name: 'braces' },
      laravel: { type: 'lucide', name: 'server-cog' },
      php: { type: 'lucide', name: 'file-code-2' },
      filament: { type: 'lucide', name: 'panel-top' },
      python: { type: 'lucide', name: 'braces' },
      java: { type: 'lucide', name: 'coffee' },
      mysql: { type: 'lucide', name: 'database' },
      postgresql: { type: 'lucide', name: 'database-zap' },
      neon: { type: 'lucide', name: 'cloud' },
      cypress: { type: 'lucide', name: 'test-tube-2' },
      vitest: { type: 'lucide', name: 'flask-conical' },
      phpunit: { type: 'lucide', name: 'shield-check' },
      'unit-testing': { type: 'lucide', name: 'check-check' },
      'testing-unitario': { type: 'lucide', name: 'check-check' },
      'tests-unitaires': { type: 'lucide', name: 'check-check' },
      'e2e-testing': { type: 'lucide', name: 'route' },
      'testing-e2e': { type: 'lucide', name: 'route' },
      'tests-e2e': { type: 'lucide', name: 'route' },
      spa: { type: 'lucide', name: 'app-window' },
      'api-rest': { type: 'lucide', name: 'router' },
      'rest-api': { type: 'lucide', name: 'router' },
      'rest-apis': { type: 'lucide', name: 'router' },
      'apis-rest': { type: 'lucide', name: 'router' },
      'component-architecture': { type: 'lucide', name: 'blocks' },
      'arquitectura-por-componentes': { type: 'lucide', name: 'blocks' },
      'architecture-par-composants': { type: 'lucide', name: 'blocks' },
      'responsive-design': { type: 'lucide', name: 'monitor-smartphone' },
      'diseno-responsive': { type: 'lucide', name: 'monitor-smartphone' },
      'design-responsive': { type: 'lucide', name: 'monitor-smartphone' },
      accessibility: { type: 'lucide', name: 'accessibility' },
      accessibilite: { type: 'lucide', name: 'accessibility' },
      'separation-of-concerns': { type: 'lucide', name: 'layers-3' },
      'separacion-de-responsabilidades': { type: 'lucide', name: 'layers-3' },
      'separation-des-responsabilites': { type: 'lucide', name: 'layers-3' },
      git: { type: 'lucide', name: 'git-branch' },
      github: { type: 'lucide', name: 'git-branch' },
      'github-actions': { type: 'lucide', name: 'workflow' },
      docker: { type: 'lucide', name: 'container' },
      linux: { type: 'lucide', name: 'terminal' },
      ssh: { type: 'lucide', name: 'key-round' },
      vercel: { type: 'lucide', name: 'triangle' },
      railway: { type: 'lucide', name: 'train-track' },
      'github-pages': { type: 'lucide', name: 'globe' },
      'vs-code': { type: 'lucide', name: 'square-code' },
      postman: { type: 'lucide', name: 'send' },
      metabase: { type: 'lucide', name: 'chart-column' },
      'openai-codex': { type: 'lucide', name: 'terminal' },
      'claude-code': { type: 'lucide', name: 'terminal-square' },
      'ai-assisted-development': { type: 'lucide', name: 'bot' },
      'ia-aplicada-al-desarrollo': { type: 'lucide', name: 'bot' },
      'ia-appliquee-au-developpement': { type: 'lucide', name: 'bot' },
    };

    return icons[this.techSlug(item)] ?? { type: 'lucide', name: 'badge' };
  }
}
