import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

export type SupportedLanguage = 'es' | 'en' | 'fr';

const STORAGE_KEY = 'jesusdev-language';
const FALLBACK_LANGUAGE: SupportedLanguage = 'es';
const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['es', 'en', 'fr'];

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

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
    });
  }

  useLanguage(language: SupportedLanguage): void {
    const normalizedLanguage = this.normalizeLanguage(language);
    this.persistLanguage(normalizedLanguage);
    this.translate.use(normalizedLanguage).subscribe(() => {
      this.currentLanguage.set(normalizedLanguage);
      this.document.documentElement.lang = normalizedLanguage;
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

}
