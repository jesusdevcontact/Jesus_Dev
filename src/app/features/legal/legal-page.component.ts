import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { TranslateArrayPipe } from '../../shared/pipes/translate-array.pipe';

type LegalPageKey = 'privacy' | 'cookies' | 'legal';

@Component({
  selector: 'jd-legal-page',
  standalone: true,
  imports: [RouterLink, TranslatePipe, TranslateArrayPipe],
  templateUrl: './legal-page.component.html',
  styleUrl: './legal-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly page = computed<LegalPageKey>(() => this.route.snapshot.data['page'] ?? 'privacy');
  readonly sections = computed(() => {
    const sections: Record<LegalPageKey, string[]> = {
      privacy: ['overview', 'data', 'storage', 'hosting', 'cookies', 'contact'],
      cookies: ['overview', 'essential', 'analytics', 'localStorage', 'manage', 'contact'],
      legal: ['purpose', 'ownership', 'activity', 'hosting', 'intellectualProperty', 'contact'],
    };

    return sections[this.page()];
  });
}
