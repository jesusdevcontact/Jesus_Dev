import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';

import { ProjectScreenshot } from '../../core/models/portfolio.models';

@Component({
  selector: 'jd-project-gallery',
  standalone: true,
  templateUrl: './project-gallery.component.html',
  styleUrl: './project-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGalleryComponent {
  private readonly document = inject(DOCUMENT);

  readonly screenshots = input.required<ProjectScreenshot[]>();
  readonly projectName = input.required<string>();
  readonly compact = input(false);
  readonly selectedScreenshotIndex = signal(0);
  readonly isLightboxOpen = signal(false);

  constructor() {
    const body = this.document.body;

    effect((onCleanup) => {
      if (!this.isLightboxOpen()) {
        return;
      }

      const previousOverflow = body.style.overflow;
      body.style.overflow = 'hidden';

      onCleanup(() => {
        body.style.overflow = previousOverflow;
      });
    });
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.screenshots().length || !this.isLightboxOpen()) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeLightbox();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.showPreviousScreenshot();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.showNextScreenshot();
    }
  }

  activeScreenshot(): ProjectScreenshot | undefined {
    const screenshots = this.screenshots();
    return screenshots[this.normalizedIndex(screenshots.length)];
  }

  showPreviousScreenshot(event?: Event): void {
    event?.stopPropagation();
    this.updateScreenshotIndex(-1);
  }

  showNextScreenshot(event?: Event): void {
    event?.stopPropagation();
    this.updateScreenshotIndex(1);
  }

  openLightbox(event?: Event): void {
    event?.stopPropagation();

    if (!this.screenshots().length) {
      return;
    }

    this.isLightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.isLightboxOpen.set(false);
  }

  private updateScreenshotIndex(delta: number): void {
    const count = this.screenshots().length;

    if (count < 2) {
      return;
    }

    this.selectedScreenshotIndex.update((currentIndex) => (currentIndex + delta + count) % count);
  }

  private normalizedIndex(count: number): number {
    return count ? this.selectedScreenshotIndex() % count : 0;
  }
}
