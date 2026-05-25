import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'jd-section-shell',
  standalone: true,
  templateUrl: './section-shell.component.html',
  styleUrl: './section-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionShellComponent {
  readonly sectionId = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly intro = input<string>();
}
