import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

const THEME_STORAGE_KEY = 'theme';
export type ThemePreference = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly themeSignal = signal<ThemePreference>(this.resolveInitialTheme());

  readonly theme = this.themeSignal.asReadonly();
  readonly icon = computed(() => (this.themeSignal() === 'dark' ? 'sun' : 'moon'));
  readonly nextTheme = computed<ThemePreference>(() => (this.themeSignal() === 'dark' ? 'light' : 'dark'));

  constructor() {
    effect(() => {
      const theme = this.themeSignal();
      this.document.documentElement.dataset['theme'] = theme;
      this.document.documentElement.style.colorScheme = theme;
      this.persistTheme(theme);
    });
  }

  toggleTheme(): void {
    this.themeSignal.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  private resolveInitialTheme(): ThemePreference {
    const storedTheme = this.readStoredTheme();

    if (storedTheme) {
      return storedTheme;
    }

    const prefersDark = this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ?? true ? 'dark' : 'light';
  }

  private readStoredTheme(): ThemePreference | null {
    try {
      const value = this.document.defaultView?.localStorage.getItem(THEME_STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }

  private persistTheme(theme: ThemePreference): void {
    try {
      this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Theme switching should still work for the current session if storage is unavailable.
    }
  }
}
