import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { socialLinks } from '../../core/data/portfolio.content';
import { buildContactMailto } from '../../core/utils/contact-mailto';

@Component({
  selector: 'jd-site-footer',
  standalone: true,
  imports: [LucideDynamicIcon, RouterLink, TranslatePipe],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent {
  private readonly translate = inject(TranslateService);

  readonly year = new Date().getFullYear();
  readonly socialLinks = socialLinks;

  mailtoHref(): string {
    return buildContactMailto(
      this.translate.instant('contactPage.email.fallbackSubject'),
      this.translate.instant('contactPage.email.fallbackBody'),
    );
  }
}
