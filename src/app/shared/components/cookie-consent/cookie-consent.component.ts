import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

const COOKIE_CONSENT_KEY = 'jesusdev-cookie-consent';
type CookieConsentChoice = 'accepted' | 'rejected';

@Component({
  selector: 'jd-cookie-consent',
  standalone: true,
  imports: [LucideDynamicIcon, TranslatePipe],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentComponent {
  readonly consent = signal<CookieConsentChoice | null>(this.readConsent());
  readonly panelOpen = signal(!this.consent());

  @HostListener('document:keydown.escape')
  closeWithEscape(): void {
    this.panelOpen.set(false);
  }

  openSettings(): void {
    this.panelOpen.set(true);
  }

  accept(): void {
    this.saveConsent('accepted');
  }

  reject(): void {
    this.saveConsent('rejected');
  }

  private saveConsent(choice: CookieConsentChoice): void {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    } catch {
      // Consent UI should remain usable even if storage is unavailable.
    }
    this.consent.set(choice);
    this.panelOpen.set(false);
  }

  private readConsent(): CookieConsentChoice | null {
    try {
      const value = localStorage.getItem(COOKIE_CONSENT_KEY);
      return value === 'accepted' || value === 'rejected' ? value : null;
    } catch {
      return null;
    }
  }
}
