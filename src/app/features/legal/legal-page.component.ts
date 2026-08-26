import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { startWith } from 'rxjs';

import { TranslateArrayPipe } from '../../shared/pipes/translate-array.pipe';
import { buildContactMailto } from '../../core/utils/contact-mailto';
import { SeoService } from '../../core/seo/seo.service';

type LegalPageKey = 'privacy' | 'cookies' | 'legal';

@Component({
  selector: 'jd-legal-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe, TranslateArrayPipe],
  templateUrl: './legal-page.component.html',
  styleUrl: './legal-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);
  readonly page = computed<LegalPageKey>(() => this.route.snapshot.data['page'] ?? 'privacy');
  readonly sections = computed(() => {
    const sections: Record<LegalPageKey, string[]> = {
      privacy: ['overview', 'data', 'storage', 'hosting', 'cookies', 'contact'],
      cookies: ['overview', 'localStorage', 'notUsed', 'manage', 'contact'],
      legal: ['purpose', 'ownership', 'activity', 'hosting', 'intellectualProperty', 'contact'],
    };

    return sections[this.page()];
  });

  constructor() {
    const languageChanges = toSignal(this.translate.onLangChange.pipe(startWith(null)), { initialValue: null });

    effect(() => {
      languageChanges();
      const page = this.page();

      this.seo.update({
        title: this.translate.instant(`seo.pages.${page}.title`),
        description: this.translate.instant(`seo.pages.${page}.description`),
        imageAlt: this.translate.instant('seo.imageAlt'),
        path: `/${page}`,
        locale: this.localeFor(this.translate.currentLang),
      });
      this.seo.removeJsonLd('profile');
      this.seo.removeJsonLd('project');
    });
  }

  mailtoHref(): string {
    return buildContactMailto(
      this.translate.instant('contactPage.email.fallbackSubject'),
      this.translate.instant('contactPage.email.fallbackBody'),
    );
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
