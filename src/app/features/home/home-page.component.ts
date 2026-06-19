import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { TechStackCardComponent } from '../../components/tech-stack-card/tech-stack-card.component';
import { journeyItems, projects, techCategories } from '../../core/data/portfolio.content';
import { TechCategoryKey } from '../../core/models/portfolio.models';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { SectionShellComponent } from '../../shared/components/section-shell/section-shell.component';
import { TranslateArrayPipe } from '../../shared/pipes/translate-array.pipe';
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
    TranslateArrayPipe,
    TranslatePipe,
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
  readonly openTechCategory = signal<TechCategoryKey | null>(null);

  readonly principles = ['decisions', 'accessibility', 'testing', 'maintenance'];

  toggleTechCategory(category: TechCategoryKey): void {
    this.openTechCategory.update((currentCategory) => (currentCategory === category ? null : category));
  }
}
