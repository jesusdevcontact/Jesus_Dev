import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

export type SupportedLanguage = 'es' | 'en' | 'fr';

const STORAGE_KEY = 'jesusdev-language';
const FALLBACK_LANGUAGE: SupportedLanguage = 'es';
const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['es', 'en', 'fr'];

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly languages = SUPPORTED_LANGUAGES;
  readonly currentLanguage = signal<SupportedLanguage>(FALLBACK_LANGUAGE);

  init(): void {
    this.translate.addLangs([...SUPPORTED_LANGUAGES]);
    this.translate.setFallbackLang(FALLBACK_LANGUAGE).subscribe();

    const initialLanguage = this.getInitialLanguage();
    this.useLanguage(initialLanguage);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const language = this.normalizeLanguage(event.lang);
      this.currentLanguage.set(language);
      this.document.documentElement.lang = language;
      this.updateSeo();
    });
  }

  useLanguage(language: SupportedLanguage): void {
    const normalizedLanguage = this.normalizeLanguage(language);
    this.persistLanguage(normalizedLanguage);
    this.translate.use(normalizedLanguage).subscribe(() => {
      this.currentLanguage.set(normalizedLanguage);
      this.document.documentElement.lang = normalizedLanguage;
      this.updateSeo();
    });
  }

  private getInitialLanguage(): SupportedLanguage {
    const savedLanguage = this.readSavedLanguage();

    if (savedLanguage) {
      return savedLanguage;
    }

    const browserLanguage = this.translate.getBrowserCultureLang() || this.translate.getBrowserLang() || '';
    return this.mapBrowserLanguage(browserLanguage);
  }

  private mapBrowserLanguage(language: string): SupportedLanguage {
    const normalizedLanguage = language.toLowerCase();

    if (normalizedLanguage.startsWith('es')) {
      return 'es';
    }

    if (normalizedLanguage.startsWith('fr')) {
      return 'fr';
    }

    if (normalizedLanguage.startsWith('en')) {
      return 'en';
    }

    return 'en';
  }

  private normalizeLanguage(language: string): SupportedLanguage {
    return SUPPORTED_LANGUAGES.includes(language as SupportedLanguage) ? (language as SupportedLanguage) : FALLBACK_LANGUAGE;
  }

  private readSavedLanguage(): SupportedLanguage | null {
    try {
      const savedLanguage = localStorage.getItem(STORAGE_KEY);
      return savedLanguage ? this.normalizeLanguage(savedLanguage) : null;
    } catch {
      return null;
    }
  }

  private persistLanguage(language: SupportedLanguage): void {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Storage can be unavailable in private browsing contexts.
    }
  }

  private updateSeo(): void {
    const title = this.translate.instant('seo.title');
    const description = this.translate.instant('seo.description');
    const imageAlt = this.translate.instant('seo.imageAlt');

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:locale', content: this.localeFor(this.currentLanguage()) });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ property: 'og:image:alt', content: imageAlt });
    this.meta.updateTag({ name: 'twitter:image:alt', content: imageAlt });
  }

  private localeFor(language: SupportedLanguage): string {
    const locales: Record<SupportedLanguage, string> = {
      es: 'es_ES',
      en: 'en_US',
      fr: 'fr_FR',
    };

    return locales[language];
  }
}
