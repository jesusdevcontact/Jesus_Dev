import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { startWith } from 'rxjs';

import { socialLinks } from '../../core/data/portfolio.content';
import { SeoService } from '../../core/seo/seo.service';
import { buildContactMailto } from '../../core/utils/contact-mailto';

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

  readonly fallbackMailto = buildContactMailto();
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
    const subject = this.subject.trim() || 'Oportunidad o proyecto digital · Jesus Martinez Escobar';
    const body = [
      'Buenas,',
      '',
      'Me pongo en contacto contigo para comentar una oportunidad, colaboración o proyecto digital.',
      '',
      `Nombre: ${this.name.trim()}`,
      `Empresa: ${this.company.trim()}`,
      'Mensaje:',
      this.message.trim(),
      '',
    ].join('\n');

    return buildContactMailto(subject, body);
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
