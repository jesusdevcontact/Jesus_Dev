import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { I18nService } from './core/i18n/i18n.service';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { CookieConsentComponent } from './shared/components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'jd-root',
  standalone: true,
  imports: [RouterOutlet, SiteFooterComponent, SiteHeaderComponent, CookieConsentComponent, TranslatePipe],
  template: `
    <a class="skip-link" href="#main-content">{{ 'accessibility.skipToContent' | translate }}</a>
    <jd-site-header />
    <router-outlet />
    <jd-site-footer />
    <jd-cookie-consent />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(i18n: I18nService) {
    i18n.init();
  }
}
