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
  readonly icon = input<string>('ArrowRight');
  readonly variant = input<'primary' | 'secondary' | 'ghost'>('primary');
  readonly external = input(false);
  readonly ariaLabel = input<string>();
}
