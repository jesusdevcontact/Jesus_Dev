import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { fromEvent, map, startWith } from 'rxjs';

import { I18nService } from './core/i18n/i18n.service';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';
import { PortfolioChatbotComponent } from './shared/components/portfolio-chatbot/portfolio-chatbot.component';

@Component({
  selector: 'jd-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SiteFooterComponent,
    SiteHeaderComponent,
    CookieConsentComponent,
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
      <jd-site-header />
      <router-outlet />
      <jd-site-footer />
      <jd-cookie-consent />
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

  readonly showBackToTop = toSignal(
    fromEvent(this.document, 'scroll').pipe(
      startWith(null),
      map(() => this.document.documentElement.scrollTop > 680),
    ),
    { initialValue: false },
  );

  constructor(i18n: I18nService) {
    i18n.init();
  }

  scrollToTop(): void {
    const view = this.document.defaultView;
    const prefersReducedMotion = view?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false;

    view?.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }
}
