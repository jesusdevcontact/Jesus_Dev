import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, input, signal } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

import { Project, ProjectScreenshot } from '../../core/models/portfolio.models';
import { TranslateArrayPipe } from '../../shared/pipes/translate-array.pipe';

@Component({
  selector: 'jd-project-card',
  standalone: true,
  imports: [NgClass, LucideDynamicIcon, TranslatePipe, TranslateArrayPipe],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly selectedScreenshotIndex = signal(0);
  readonly isLightboxOpen = signal(false);

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.project().screenshots?.length) {
      return;
    }

    if (event.key === 'Escape' && this.isLightboxOpen()) {
      event.preventDefault();
      this.closeLightbox();
      return;
    }

    if (!this.isLightboxOpen()) {
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

  activeScreenshot(screenshots: ProjectScreenshot[]): ProjectScreenshot | undefined {
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

    if (!this.project().screenshots?.length) {
      return;
    }

    this.isLightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.isLightboxOpen.set(false);
  }

  private updateScreenshotIndex(delta: number): void {
    const count = this.project().screenshots?.length ?? 0;

    if (count < 2) {
      return;
    }

    this.selectedScreenshotIndex.update((currentIndex) => (currentIndex + delta + count) % count);
  }

  private normalizedIndex(count: number): number {
    return count ? this.selectedScreenshotIndex() % count : 0;
  }
}
