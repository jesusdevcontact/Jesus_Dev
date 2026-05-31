import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  AfterViewInit,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

const COOKIE_CONSENT_KEY = 'jesusdev-cookie-consent';
interface CookieConsentState {
  accepted: boolean;
  timestamp: string;
}

@Component({
  selector: 'jd-cookie-consent',
  standalone: true,
  imports: [LucideDynamicIcon, TranslatePipe],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentComponent implements AfterViewInit {
  @ViewChild('acceptButton') private acceptButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('settingsButton') private settingsButton?: ElementRef<HTMLButtonElement>;

  readonly consent = signal<CookieConsentState | null>(this.readConsent());
  readonly panelOpen = signal(!this.consent());
  readonly hasConsent = computed(() => this.consent() !== null);
  readonly noticeAccepted = computed(() => this.consent()?.accepted === true);

  @HostListener('document:keydown.escape')
  closeWithEscape(): void {
    this.closePanel();
  }

  ngAfterViewInit(): void {
    if (this.panelOpen()) {
      this.focusPrimaryAction();
    }
  }

  openSettings(): void {
    this.panelOpen.set(true);
    this.focusPrimaryAction();
  }

  accept(): void {
    this.saveConsent({ accepted: true, timestamp: new Date().toISOString() });
  }

  reject(): void {
    this.saveConsent({ accepted: false, timestamp: new Date().toISOString() });
  }

  closePanel(): void {
    if (!this.hasConsent()) {
      this.reject();
      return;
    }

    this.panelOpen.set(false);
    this.restoreSettingsFocus();
  }

  private saveConsent(choice: CookieConsentState): void {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(choice));
    } catch {
      // Consent UI should remain usable even if storage is unavailable.
    }
    this.consent.set(choice);
    this.panelOpen.set(false);
    this.restoreSettingsFocus();
  }

  private readConsent(): CookieConsentState | null {
    try {
      const value = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!value) {
        return null;
      }

      if (value === 'accepted' || value === 'rejected') {
        return {
          accepted: value === 'accepted',
          timestamp: new Date().toISOString(),
        };
      }

      const parsed = JSON.parse(value) as Partial<CookieConsentState>;
      return typeof parsed.accepted === 'boolean'
        ? {
            accepted: parsed.accepted,
            timestamp: typeof parsed.timestamp === 'string' ? parsed.timestamp : new Date().toISOString(),
          }
        : null;
    } catch {
      return null;
    }
  }

  private focusPrimaryAction(): void {
    setTimeout(() => this.acceptButton?.nativeElement.focus(), 0);
  }

  private restoreSettingsFocus(): void {
    setTimeout(() => this.settingsButton?.nativeElement.focus(), 0);
  }
}
