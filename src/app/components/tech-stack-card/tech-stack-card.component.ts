import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';

import { TechCategory } from '../../core/models/portfolio.models';

@Component({
  selector: 'jd-tech-stack-card',
  standalone: true,
  imports: [NgClass, LucideDynamicIcon],
  templateUrl: './tech-stack-card.component.html',
  styleUrl: './tech-stack-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackCardComponent {
  readonly category = input.required<TechCategory>();

  iconFor(title: string): string {
    const icons: Record<string, string> = {
      Frontend: 'code-2',
      Backend: 'database',
      Testing: 'shield-check',
      DevOps: 'workflow',
      Tooling: 'terminal',
    };

    return icons[title] ?? 'code-2';
  }
}
