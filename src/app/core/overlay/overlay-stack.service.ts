import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';

export interface OverlayRef {
  close(restoreFocus?: boolean): void;
  isTop(): boolean;
}

interface OverlayEntry {
  id: symbol;
  element: HTMLElement;
  opener: HTMLElement | null;
  requestClose: () => void;
  inertedElements: HTMLElement[];
  activatedElements: HTMLElement[];
  closing: boolean;
}

interface BodyStyleSnapshot {
  overflow: string;
  position: string;
  top: string;
  width: string;
  paddingRight: string;
  scrollY: number;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

@Injectable({ providedIn: 'root' })
export class OverlayStackService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly stack: OverlayEntry[] = [];
  private readonly inertState = new Map<HTMLElement, { count: number; initiallyInert: boolean }>();
  private bodyStyleSnapshot: BodyStyleSnapshot | null = null;

  constructor() {
    const keydown = (event: KeyboardEvent) => this.handleKeydown(event);
    const focusin = (event: FocusEvent) => this.handleFocusIn(event);
    this.document.addEventListener('keydown', keydown, true);
    this.document.addEventListener('focusin', focusin, true);
    this.destroyRef.onDestroy(() => {
      this.document.removeEventListener('keydown', keydown, true);
      this.document.removeEventListener('focusin', focusin, true);
    });
  }

  open(options: {
    element: HTMLElement;
    opener?: HTMLElement | null;
    initialFocus?: HTMLElement | null;
    requestClose: () => void;
  }): OverlayRef {
    const id = Symbol('overlay');
    const activatedElements = this.activatePath(options.element);
    const entry: OverlayEntry = {
      id,
      element: options.element,
      opener: options.opener ?? this.activeElement(),
      requestClose: options.requestClose,
      inertedElements: this.inertOutside(options.element),
      activatedElements,
      closing: false,
    };

    this.stack.push(entry);
    this.lockScroll();
    this.scheduleFocus(options.initialFocus ?? this.firstFocusable(options.element) ?? options.element);

    return {
      close: (restoreFocus = true) => this.close(id, restoreFocus),
      isTop: () => this.stack.at(-1)?.id === id,
    };
  }

  private close(id: symbol, restoreFocus: boolean): void {
    const index = this.stack.findIndex((entry) => entry.id === id);
    if (index < 0) {
      return;
    }

    const wasTop = index === this.stack.length - 1;
    const [entry] = this.stack.splice(index, 1);
    this.restoreInert(entry.inertedElements);
    this.restoreActivatedPath(entry.activatedElements);
    this.unlockScrollIfEmpty();

    if (restoreFocus && wasTop) {
      const nextOverlay = this.stack.at(-1);
      const focusTarget = nextOverlay
        ? entry.opener?.isConnected && nextOverlay.element.contains(entry.opener)
          ? entry.opener
          : this.firstFocusable(nextOverlay.element) ?? nextOverlay.element
        : entry.opener?.isConnected
          ? entry.opener
          : null;
      this.scheduleFocus(focusTarget);
    }
  }

  private handleKeydown(event: KeyboardEvent): void {
    const top = this.stack.at(-1);
    if (!top || event.defaultPrevented) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      if (!top.closing) {
        top.closing = true;
        top.requestClose();
      }
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusable = this.focusableElements(top.element);
    if (!focusable.length) {
      event.preventDefault();
      top.element.focus();
      return;
    }

    const active = this.activeElement();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const focusIsInside = active ? top.element.contains(active) : false;
    const focusIsInTabOrder = active ? focusable.includes(active) : false;

    if (!focusIsInside || !focusIsInTabOrder || (event.shiftKey && active === first)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private handleFocusIn(event: FocusEvent): void {
    const top = this.stack.at(-1);
    const target = event.target;
    if (!top || !(target instanceof Node) || top.element.contains(target)) {
      return;
    }

    this.scheduleFocus(this.firstFocusable(top.element) ?? top.element);
  }

  private inertOutside(overlay: HTMLElement): HTMLElement[] {
    const inerted: HTMLElement[] = [];
    let current: HTMLElement | null = overlay;

    while (current?.parentElement) {
      for (const sibling of Array.from(current.parentElement.children)) {
        if (sibling !== current && sibling instanceof HTMLElement) {
          this.addInert(sibling);
          inerted.push(sibling);
        }
      }
      current = current.parentElement;
    }

    return inerted;
  }

  private activatePath(overlay: HTMLElement): HTMLElement[] {
    const activated: HTMLElement[] = [];
    let current: HTMLElement | null = overlay;

    while (current && current !== this.document.body) {
      if (this.inertState.has(current) && current.inert) {
        current.inert = false;
        activated.push(current);
      }
      current = current.parentElement;
    }

    return activated;
  }

  private restoreActivatedPath(elements: readonly HTMLElement[]): void {
    for (const element of elements) {
      if (this.inertState.has(element)) {
        element.inert = true;
      }
    }
  }

  private addInert(element: HTMLElement): void {
    const current = this.inertState.get(element);
    if (current) {
      current.count += 1;
      return;
    }

    this.inertState.set(element, { count: 1, initiallyInert: element.inert === true });
    element.inert = true;
  }

  private restoreInert(elements: readonly HTMLElement[]): void {
    for (const element of elements) {
      const current = this.inertState.get(element);
      if (!current) {
        continue;
      }

      current.count -= 1;
      if (current.count === 0) {
        element.inert = current.initiallyInert;
        this.inertState.delete(element);
      }
    }
  }

  private lockScroll(): void {
    if (this.bodyStyleSnapshot) {
      return;
    }

    const view = this.document.defaultView;
    if (!view) {
      return;
    }

    const body = this.document.body;
    const scrollY = view.scrollY;
    const scrollbarWidth = Math.max(0, view.innerWidth - this.document.documentElement.clientWidth);
    this.bodyStyleSnapshot = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
      scrollY,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    if (scrollbarWidth) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  private unlockScrollIfEmpty(): void {
    const view = this.document.defaultView;
    if (this.stack.length || !this.bodyStyleSnapshot || !view) {
      return;
    }

    const body = this.document.body;
    const snapshot = this.bodyStyleSnapshot;
    body.style.overflow = snapshot.overflow;
    body.style.position = snapshot.position;
    body.style.top = snapshot.top;
    body.style.width = snapshot.width;
    body.style.paddingRight = snapshot.paddingRight;
    this.bodyStyleSnapshot = null;
    view.scrollTo({ top: snapshot.scrollY, behavior: 'auto' });
  }

  private focusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((element) => {
      const style = this.document.defaultView?.getComputedStyle(element);
      return (
        !element.hidden &&
        !element.closest('[hidden], [inert]') &&
        style?.display !== 'none' &&
        style?.visibility !== 'hidden'
      );
    });
  }

  private firstFocusable(container: HTMLElement): HTMLElement | null {
    return this.focusableElements(container)[0] ?? null;
  }

  private activeElement(): HTMLElement | null {
    return this.document.activeElement instanceof HTMLElement ? this.document.activeElement : null;
  }

  private scheduleFocus(element: HTMLElement | null): void {
    if (!element) {
      return;
    }

    const view = this.document.defaultView;
    if (view) {
      view.requestAnimationFrame(() => element.isConnected && element.focus());
      return;
    }

    element.focus();
  }
}
