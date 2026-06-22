import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';

import { chatbotNodes } from '../../../core/data/chatbot.content';
import { ChatbotAction, ChatbotNode, ChatbotNodeId } from '../../../core/models/portfolio.models';

interface ChatbotMessage {
  author: 'assistant' | 'visitor';
  textKey: string;
}

@Component({
  selector: 'jd-portfolio-chatbot',
  standalone: true,
  imports: [LucideDynamicIcon, RouterLink, TranslatePipe],
  templateUrl: './portfolio-chatbot.component.html',
  styleUrl: './portfolio-chatbot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioChatbotComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  @ViewChild('panel') private panel?: ElementRef<HTMLElement>;
  @ViewChild('chatBody') private chatBody?: ElementRef<HTMLElement>;
  @ViewChild('closeButton') private closeButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('dialogTitle') private dialogTitle?: ElementRef<HTMLElement>;
  @ViewChild('launcherButton') private launcherButton?: ElementRef<HTMLButtonElement>;

  private readonly nodesById = new Map<ChatbotNodeId, ChatbotNode>(chatbotNodes.map((node) => [node.id, node]));
  private opener: HTMLElement | null = null;
  private responseTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly frameIds = new Set<number>();
  private bodyLock: {
    overflow: string;
    position: string;
    top: string;
    width: string;
    scrollY: number;
  } | null = null;

  readonly panelId = 'portfolio-chatbot-panel';
  readonly titleId = 'portfolio-chatbot-title';
  readonly descriptionId = 'portfolio-chatbot-description';
  readonly isOpen = signal(false);
  readonly currentNodeId = signal<ChatbotNodeId>('welcome');
  readonly responsePending = signal(false);
  readonly latestResponseKey = signal('chatbot.messages.welcome');
  readonly messages = signal<readonly ChatbotMessage[]>([
    {
      author: 'assistant',
      textKey: 'chatbot.messages.welcome',
    },
  ]);

  readonly currentNode = computed(() => this.nodeFor(this.currentNodeId()));
  readonly actions = computed(() => (this.responsePending() ? [] : this.currentNode().actions));
  readonly isAtWelcome = computed(() => this.currentNodeId() === 'welcome');

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (this.isOpen()) {
          this.close({ restoreFocus: true });
        }
      });

    effect(() => {
      if (this.isOpen()) {
        this.lockBodyScrollIfNeeded();
        this.focusDialogTitle();
        return;
      }

      this.unlockBodyScroll();
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleDocumentKeydown(event: KeyboardEvent): void {
    if (!this.isOpen() || event.defaultPrevented) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  toggle(): void {
    if (this.isOpen()) {
      this.close();
      return;
    }

    this.open();
  }

  open(): void {
    this.opener = this.document.activeElement instanceof HTMLElement ? this.document.activeElement : null;
    this.isOpen.set(true);
  }

  close(options: { restoreFocus?: boolean } = { restoreFocus: true }): void {
    this.cancelPendingResponse();
    this.isOpen.set(false);
    this.unlockBodyScroll();

    if (options.restoreFocus ?? true) {
      this.restoreFocus();
    }
  }

  selectNodeAction(action: Extract<ChatbotAction, { type: 'node' }>): void {
    if (action.targetNodeId === 'welcome') {
      this.resetConversation();
      return;
    }

    const nextNode = this.nodeFor(action.targetNodeId);
    this.messages.update((messages) => [
      ...this.trimMessages(messages),
      {
        author: 'visitor',
        textKey: action.labelKey,
      },
    ]);
    this.responsePending.set(true);
    this.scrollConversationToEnd();

    if (this.prefersReducedMotion()) {
      this.completeNodeResponse(nextNode);
      return;
    }

    this.cancelPendingResponse(false);
    this.responseTimer = setTimeout(() => this.completeNodeResponse(nextNode), 320);
  }

  returnHome(): void {
    this.resetConversation();
  }

  closeAfterNavigation(): void {
    this.close({ restoreFocus: true });
  }

  routeCommands(action: Extract<ChatbotAction, { type: 'route' }>): readonly string[] {
    return [action.route];
  }

  resetConversation(): void {
    this.cancelPendingResponse();
    this.currentNodeId.set('welcome');
    this.latestResponseKey.set('chatbot.messages.welcome');
    this.messages.set([
      {
        author: 'assistant',
        textKey: 'chatbot.messages.welcome',
      },
    ]);
    this.scrollConversationToEnd();
    this.focusDialogTitle();
  }

  ngOnDestroy(): void {
    this.cancelPendingResponse();
    this.cancelAnimationFrames();
    this.unlockBodyScroll();
  }

  private nodeFor(id: ChatbotNodeId): ChatbotNode {
    const node = this.nodesById.get(id);

    if (!node) {
      return this.nodesById.get('welcome')!;
    }

    return node;
  }

  private completeNodeResponse(node: ChatbotNode): void {
    this.responseTimer = null;
    this.currentNodeId.set(node.id);
    this.latestResponseKey.set(node.messageKey);
    this.responsePending.set(false);
    this.messages.update((messages) =>
      this.trimMessages([
        ...messages,
        {
          author: 'assistant',
          textKey: node.messageKey,
        },
      ]),
    );
    this.scrollConversationToEnd();
    this.focusFirstAction();
  }

  private trimMessages(messages: readonly ChatbotMessage[]): readonly ChatbotMessage[] {
    const welcome = messages[0];
    const recentMessages = messages.slice(-6);
    return welcome && recentMessages[0] !== welcome ? [welcome, ...recentMessages] : recentMessages;
  }

  private cancelPendingResponse(updateSignal = true): void {
    if (this.responseTimer) {
      clearTimeout(this.responseTimer);
      this.responseTimer = null;
    }

    if (updateSignal) {
      if (this.responsePending()) {
        this.messages.update((messages) => {
          const lastMessage = messages[messages.length - 1];
          return lastMessage?.author === 'visitor' ? messages.slice(0, -1) : messages;
        });
      }
      this.responsePending.set(false);
    }
  }

  private focusDialogTitle(): void {
    this.requestFrame(() => this.dialogTitle?.nativeElement.focus());
  }

  private focusFirstAction(): void {
    this.requestFrame(() => this.focusableElements()[0]?.focus());
  }

  private restoreFocus(): void {
    this.requestFrame(() => {
      const target = this.opener?.isConnected ? this.opener : this.launcherButton?.nativeElement;
      target?.focus();
      this.opener = null;
    });
  }

  private trapFocus(event: KeyboardEvent): void {
    const focusable = this.focusableElements();

    if (!focusable.length) {
      event.preventDefault();
      this.dialogTitle?.nativeElement.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private focusableElements(): HTMLElement[] {
    const panel = this.panel?.nativeElement;

    if (!panel) {
      return [];
    }

    return Array.from(
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute('disabled') && element.offsetParent !== null);
  }

  private scrollConversationToEnd(): void {
    this.requestFrame(() => {
      const body = this.chatBody?.nativeElement;

      if (!body) {
        return;
      }

      body.scrollTo({
        top: body.scrollHeight,
        behavior: this.prefersReducedMotion() ? 'auto' : 'smooth',
      });
    });
  }

  private requestFrame(callback: () => void): void {
    const view = this.document.defaultView;

    if (!view) {
      callback();
      return;
    }

    const frameId = view.requestAnimationFrame(() => {
      this.frameIds.delete(frameId);
      callback();
    });
    this.frameIds.add(frameId);
  }

  private cancelAnimationFrames(): void {
    const view = this.document.defaultView;

    if (view) {
      for (const frameId of this.frameIds) {
        view.cancelAnimationFrame(frameId);
      }
    }

    this.frameIds.clear();
  }

  private lockBodyScrollIfNeeded(): void {
    const view = this.document.defaultView;

    if (!view || !view.matchMedia('(max-width: 699px)').matches || this.bodyLock) {
      return;
    }

    const body = this.document.body;
    const scrollY = view.scrollY;
    this.bodyLock = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      scrollY,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
  }

  private unlockBodyScroll(): void {
    const view = this.document.defaultView;

    if (!this.bodyLock || !view) {
      return;
    }

    const body = this.document.body;
    const lock = this.bodyLock;
    body.style.overflow = lock.overflow;
    body.style.position = lock.position;
    body.style.top = lock.top;
    body.style.width = lock.width;
    this.bodyLock = null;
    view.scrollTo({ top: lock.scrollY, behavior: 'auto' });
  }

  private prefersReducedMotion(): boolean {
    return this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false;
  }
}
