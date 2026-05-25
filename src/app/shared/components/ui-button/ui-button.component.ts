import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'jd-ui-button',
  standalone: true,
  imports: [LucideDynamicIcon, NgClass],
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();
  readonly icon = input<string>('arrow-right');
  readonly variant = input<'primary' | 'secondary' | 'ghost'>('primary');
  readonly external = input(false);
  readonly ariaLabel = input<string>();

  iconName(): string {
    const aliases: Record<string, string> = {
      ArrowRight: 'arrow-right',
      ExternalLink: 'external-link',
      Github: 'external-link',
      Linkedin: 'external-link',
      Mail: 'mail',
    };

    return aliases[this.icon()] ?? this.icon();
  }
}
