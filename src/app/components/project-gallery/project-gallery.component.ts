import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
  input,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ProjectScreenshot } from '../../core/models/portfolio.models';
import { OverlayRef, OverlayStackService } from '../../core/overlay/overlay-stack.service';

@Component({
  selector: 'jd-project-gallery',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './project-gallery.component.html',
  styleUrl: './project-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGalleryComponent {
  private readonly document = inject(DOCUMENT);
  private readonly overlayStack = inject(OverlayStackService);
  private previouslyFocusedElement?: HTMLElement;
  private overlayRef: OverlayRef | null = null;

  @ViewChild('lightbox') private lightbox?: ElementRef<HTMLDialogElement>;
  @ViewChild('closeButton') private closeButton?: ElementRef<HTMLButtonElement>;

  readonly screenshots = input.required<ProjectScreenshot[]>();
  readonly projectName = input.required<string>();
  readonly compact = input(false);
  readonly selectedScreenshotIndex = signal(0);
  readonly isLightboxOpen = signal(false);

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.screenshots().length || !this.isLightboxOpen() || !this.overlayRef?.isTop()) {
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

    this.previouslyFocusedElement = this.document.activeElement instanceof HTMLElement
      ? this.document.activeElement
      : undefined;
    this.isLightboxOpen.set(true);
    this.document.defaultView?.requestAnimationFrame(() => this.registerOverlay());
  }

  closeLightbox(): void {
    const opener = this.previouslyFocusedElement;
    const hadOverlay = this.overlayRef !== null;
    if (this.lightbox?.nativeElement.open) {
      this.lightbox.nativeElement.close();
    }
    this.isLightboxOpen.set(false);
    this.overlayRef?.close();
    this.overlayRef = null;
    this.previouslyFocusedElement = undefined;
    if (!hadOverlay && opener?.isConnected) {
      opener.focus();
    }
  }

  closeFromBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeLightbox();
    }
  }

  ngOnDestroy(): void {
    this.overlayRef?.close(false);
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

  private registerOverlay(): void {
    const lightbox = this.lightbox?.nativeElement;
    if (!this.isLightboxOpen() || !lightbox || this.overlayRef) {
      return;
    }

    if (!lightbox.open) {
      lightbox.showModal();
    }

    this.overlayRef = this.overlayStack.open({
      element: lightbox,
      opener: this.previouslyFocusedElement,
      initialFocus: this.closeButton?.nativeElement,
      requestClose: () => this.closeLightbox(),
    });
  }
}
