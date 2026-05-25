import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { fromEvent, map, startWith } from 'rxjs';

import { navItems } from '../../core/data/portfolio.content';
import { I18nService, SupportedLanguage } from '../../core/i18n/i18n.service';

@Component({
  selector: 'jd-site-header',
  standalone: true,
  imports: [LucideDynamicIcon, TranslatePipe],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent {
  private readonly document = inject(DOCUMENT);
  readonly i18n = inject(I18nService);
  readonly navItems = navItems;
  readonly menuOpen = signal(false);
  readonly scrolled = toSignal(
    fromEvent(this.document, 'scroll').pipe(
      startWith(null),
      map(() => this.document.documentElement.scrollTop > 24),
    ),
    { initialValue: false },
  );
  readonly menuIcon = computed(() => (this.menuOpen() ? 'x' : 'menu'));

  toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  changeLanguage(language: SupportedLanguage): void {
    this.i18n.useLanguage(language);
    this.closeMenu();
  }

  navHref(target: string): string {
    return target.startsWith('/') ? target : `/#${target}`;
  }
}
