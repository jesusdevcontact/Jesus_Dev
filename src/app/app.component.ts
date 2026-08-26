import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, fromEvent, map, startWith } from 'rxjs';

import { I18nService } from './core/i18n/i18n.service';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { PortfolioChatbotComponent } from './shared/components/portfolio-chatbot/portfolio-chatbot.component';

@Component({
  selector: 'jd-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SiteFooterComponent,
    SiteHeaderComponent,
    PortfolioChatbotComponent,
    LucideDynamicIcon,
    TranslatePipe,
  ],
  template: `
    <div class="cosmic-backdrop" aria-hidden="true">
      <span class="cosmic-planet cosmic-planet--saturn"></span>
      <span class="cosmic-planet cosmic-planet--jupiter"></span>
      <span class="cosmic-planet cosmic-planet--distant"></span>
    </div>
    <div class="app-shell">
      <a class="skip-link" href="#main-content">{{ 'accessibility.skipToContent' | translate }}</a>
      <p class="sr-only" aria-live="polite" aria-atomic="true">{{ navigationAnnouncement() }}</p>
      <jd-site-header />
      <router-outlet />
      <jd-site-footer />
      <jd-portfolio-chatbot />
      @if (showBackToTop()) {
        <button
          class="back-to-top"
          type="button"
          [attr.aria-label]="'accessibility.backToTop' | translate"
          [attr.title]="'accessibility.backToTop' | translate"
          (click)="scrollToTop()"
        >
          <svg lucideIcon="arrow-up" size="18" aria-hidden="true"></svg>
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private hasCompletedInitialNavigation = false;

  readonly navigationAnnouncement = signal('');

  readonly showBackToTop = toSignal(
    fromEvent(this.document, 'scroll').pipe(
      startWith(null),
      map(() => this.document.documentElement.scrollTop > 680),
    ),
    { initialValue: false },
  );

  constructor(i18n: I18nService) {
    this.clearLegacyConsent();
    i18n.init();
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => this.handleNavigation(event));
  }

  scrollToTop(): void {
    const view = this.document.defaultView;
    const prefersReducedMotion = view?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false;

    view?.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

  private handleNavigation(event: NavigationEnd): void {
    if (!this.hasCompletedInitialNavigation) {
      this.hasCompletedInitialNavigation = true;
      return;
    }

    const view = this.document.defaultView;
    view?.requestAnimationFrame(() => {
      const fragment = event.urlAfterRedirects.split('#')[1];
      const fragmentTarget = fragment
        ? this.document.getElementById(decodeURIComponent(fragment))
        : null;
      const focusTarget = fragmentTarget ?? this.document.querySelector<HTMLElement>('main h1, main');
      if (focusTarget) {
        if (!focusTarget.hasAttribute('tabindex')) {
          focusTarget.setAttribute('tabindex', '-1');
        }
        focusTarget.focus({ preventScroll: true });
      }

      this.navigationAnnouncement.set('');
      view.requestAnimationFrame(() => this.navigationAnnouncement.set(this.document.title));
    });
  }

  private clearLegacyConsent(): void {
    try {
      this.document.defaultView?.localStorage.removeItem('jesusdev-cookie-consent');
    } catch {
      // Storage can be unavailable; the obsolete value is harmless when unread.
    }
  }
}
