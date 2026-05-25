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
      devops: 'workflow',
      tooling: 'terminal',
    };

    return icons[key] ?? 'code-2';
  }

  techSlug(item: string): string {
    return item
      .toLowerCase()
      .replace(/\+/g, 'plus')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  techMark(item: string): string {
    const marks: Record<string, string> = {
      angular: 'A',
      typescript: 'TS',
      rxjs: 'Rx',
      signals: 'Sg',
      scss: 'Sc',
      laravel: 'Lv',
      php: 'PHP',
      mysql: 'SQL',
      docker: 'D',
      vercel: '▲',
      railway: 'Rw',
      'github-actions': 'GH',
      cypress: 'Cy',
      vitest: 'Vi',
      npm: 'npm',
      pnpm: 'pn',
      vite: 'V',
    };

    return marks[this.techSlug(item)] ?? item.slice(0, 2);
  }
}
