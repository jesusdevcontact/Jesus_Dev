import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';

@Component({
  selector: 'jd-root',
  standalone: true,
  imports: [RouterOutlet, SiteFooterComponent, SiteHeaderComponent],
  template: `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <jd-site-header />
    <router-outlet />
    <jd-site-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
