import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { startWith } from 'rxjs';

import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { TechStackCardComponent } from '../../components/tech-stack-card/tech-stack-card.component';
import { journeyItems, projects, techCategories } from '../../core/data/portfolio.content';
import { JourneyKey, TechCategoryKey } from '../../core/models/portfolio.models';
import { SeoService } from '../../core/seo/seo.service';
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
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);

  readonly techCategories = techCategories;
  readonly projects = projects;
  readonly journeyItems = journeyItems;
  readonly openTechCategory = signal<TechCategoryKey | null>(null);
  readonly openJourneyItem = signal<JourneyKey | null>(null);

  readonly principles = ['decisions', 'accessibility', 'testing', 'maintenance'];

  constructor() {
    const languageChanges = toSignal(this.translate.onLangChange.pipe(startWith(null)), { initialValue: null });

    effect(() => {
      languageChanges();
      this.updateSeo();
    });
  }

  toggleTechCategory(category: TechCategoryKey): void {
    this.openTechCategory.update((currentCategory) => (currentCategory === category ? null : category));
  }

  toggleJourneyItem(item: JourneyKey): void {
    this.openJourneyItem.update((currentItem) => (currentItem === item ? null : item));
  }

  journeyTriggerId(item: JourneyKey): string {
    return `journey-trigger-${item}`;
  }

  journeyPanelId(item: JourneyKey): string {
    return `journey-panel-${item}`;
  }

  private updateSeo(): void {
    const title = this.translate.instant('seo.title');
    const description = this.translate.instant('seo.description');
    const imageAlt = this.translate.instant('seo.imageAlt');

    this.seo.update({
      title,
      description,
      imageAlt,
      path: '/',
      type: 'profile',
      locale: this.localeFor(this.translate.currentLang),
    });
    this.seo.removeJsonLd('project');
    this.seo.setJsonLd('profile', {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': 'https://jesusdev.dev/#profile',
      url: 'https://jesusdev.dev/',
      name: title,
      description,
      mainEntity: {
        '@type': 'Person',
        '@id': 'https://jesusdev.dev/#jesus-martinez-escobar',
        name: 'Jesús Martínez Escobar',
        alternateName: ['JesusDev', 'jesusdev98'],
        jobTitle: 'Desarrollador Full Stack Angular y Laravel',
        description,
        url: 'https://jesusdev.dev/',
        image: 'https://jesusdev.dev/assets/img/og-image.jpg',
        sameAs: [
          'https://github.com/jesusdev98',
          'https://linkedin.com/in/jesus-martinez-escobar-223722374',
        ],
        knowsAbout: ['Angular', 'TypeScript', 'Laravel', 'PHP', 'MySQL', 'REST APIs', 'RxJS', 'Docker', 'Testing', 'Accessibility'],
        mainEntityOfPage: 'https://jesusdev.dev/',
      },
    });
  }

  private localeFor(language: string): string {
    const locales: Record<string, string> = {
      es: 'es_ES',
      en: 'en_US',
      fr: 'fr_FR',
    };

    return locales[language] ?? 'es_ES';
  }
}
