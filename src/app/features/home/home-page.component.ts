import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';

import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { TechStackCardComponent } from '../../components/tech-stack-card/tech-stack-card.component';
import { journeyItems, projects, techCategories } from '../../core/data/portfolio.content';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionShellComponent } from '../../shared/components/section-shell/section-shell.component';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'jd-home-page',
  standalone: true,
  imports: [
    LucideDynamicIcon,
    ProjectCardComponent,
    RevealOnScrollDirective,
    SectionShellComponent,
    TechStackCardComponent,
    UiButtonComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly techCategories = techCategories;
  readonly projects = projects;
  readonly journeyItems = journeyItems;

  readonly principles = [
    'Explain decisions clearly',
    'Design accessible defaults',
    'Test risky user paths',
    'Build for maintenance',
  ];
}
