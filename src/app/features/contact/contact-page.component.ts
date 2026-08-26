import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { startWith } from 'rxjs';

import { socialLinks } from '../../core/data/portfolio.content';
import { SeoService } from '../../core/seo/seo.service';
import { buildContactMailto, CONTACT_EMAIL } from '../../core/utils/contact-mailto';

@Component({
  selector: 'jd-contact-page',
  standalone: true,
  imports: [FormsModule, LucideDynamicIcon, RouterLink, TranslatePipe],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);

  readonly contactEmail = CONTACT_EMAIL;
  readonly githubUrl = socialLinks.github;
  readonly linkedinUrl = socialLinks.linkedin;

  name = '';
  company = '';
  subject = '';
  message = '';

  constructor() {
    const languageChanges = toSignal(this.translate.onLangChange.pipe(startWith(null)), { initialValue: null });

    effect(() => {
      languageChanges();
      this.seo.update({
        title: this.translate.instant('seo.pages.contact.title'),
        description: this.translate.instant('seo.pages.contact.description'),
        imageAlt: this.translate.instant('seo.imageAlt'),
        path: '/contact',
        locale: this.localeFor(this.translate.currentLang),
      });
      this.seo.removeJsonLd('profile');
      this.seo.removeJsonLd('project');
    });
  }

  mailtoHref(): string {
    const subject = this.subject.trim() || this.translate.instant('contactPage.email.defaultSubject');
    const body = [
      this.translate.instant('contactPage.email.greeting'),
      '',
      this.translate.instant('contactPage.email.messageIntro'),
      '',
      this.translate.instant('contactPage.email.nameLine', { value: this.name.trim() }),
      this.translate.instant('contactPage.email.companyLine', { value: this.company.trim() }),
      this.translate.instant('contactPage.email.messageLabel'),
      this.message.trim(),
      '',
    ].join('\n');

    return buildContactMailto(subject, body);
  }

  fallbackMailto(): string {
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
