import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideDynamicIcon } from '@lucide/angular';
import { fromEvent, map, startWith } from 'rxjs';

import { navItems } from '../../core/data/portfolio.content';

@Component({
  selector: 'jd-site-header',
  standalone: true,
  imports: [LucideDynamicIcon],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent {
  private readonly document = inject(DOCUMENT);
  readonly navItems = navItems;
  readonly menuOpen = signal(false);
  readonly scrolled = toSignal(
    fromEvent(this.document, 'scroll').pipe(
      startWith(null),
      map(() => this.document.documentElement.scrollTop > 24),
    ),
    { initialValue: false },
  );
  readonly menuIcon = computed(() => (this.menuOpen() ? 'X' : 'Menu'));

  toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
