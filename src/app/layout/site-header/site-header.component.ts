import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, fromEvent, map, startWith } from 'rxjs';

import { navItems } from '../../core/data/portfolio.content';
import { I18nService, SupportedLanguage } from '../../core/i18n/i18n.service';
import { ThemePreference, ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'jd-site-header',
  standalone: true,
  imports: [LucideDynamicIcon, TranslatePipe, RouterLink],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('navigation') private navigation?: ElementRef<HTMLElement>;
  @ViewChild('navShell') private navShell?: ElementRef<HTMLElement>;

  readonly i18n = inject(I18nService);
  readonly theme = inject(ThemeService);
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

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.closeMenu());
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || !this.menuOpen()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.closeMenu(true);
  }

  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointerDown(event: PointerEvent): void {
    const target = event.target;
    if (this.menuOpen() && target instanceof Node && !this.navShell?.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if ((this.document.defaultView?.innerWidth ?? 0) > 820) {
      this.closeMenu();
    }
  }

  @HostListener('window:orientationchange')
  onOrientationChange(): void {
    this.closeMenu();
  }

  toggleMenu(): void {
    if (this.menuOpen()) {
      this.closeMenu();
      return;
    }

    this.menuOpen.set(true);
    this.document.defaultView?.requestAnimationFrame(() => {
      this.navigation?.nativeElement.querySelector<HTMLElement>('a')?.focus();
    });
  }

  closeMenu(restoreFocus = false): void {
    if (!this.menuOpen()) {
      return;
    }

    this.menuOpen.set(false);
    if (restoreFocus) {
      this.menuToggle?.nativeElement.focus();
    }
  }

  changeLanguage(language: SupportedLanguage): void {
    this.i18n.useLanguage(language);
    this.closeMenu();
  }

  setTheme(theme: ThemePreference): void {
    this.theme.setTheme(theme);
  }

  toggleTheme(): void {
    this.theme.toggleTheme();
  }

  isRouteTarget(target: string): boolean {
    return target.startsWith('/');
  }
}
