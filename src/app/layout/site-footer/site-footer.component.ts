import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

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
  readonly year = new Date().getFullYear();
  readonly mailtoHref = buildContactMailto();
}
