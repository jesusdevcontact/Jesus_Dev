import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
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
import { OverlayRef, OverlayStackService } from '../../../core/overlay/overlay-stack.service';

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
  private readonly overlayStack = inject(OverlayStackService);
  private readonly router = inject(Router);

  @ViewChild('layer') private layer?: ElementRef<HTMLElement>;
  @ViewChild('chatBody') private chatBody?: ElementRef<HTMLElement>;
  @ViewChild('dialogTitle') private dialogTitle?: ElementRef<HTMLElement>;
  @ViewChild('launcherButton') private launcherButton?: ElementRef<HTMLButtonElement>;

  private readonly nodesById = new Map<ChatbotNodeId, ChatbotNode>(chatbotNodes.map((node) => [node.id, node]));
  private opener: HTMLElement | null = null;
  private overlayRef: OverlayRef | null = null;
  private responseTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly frameIds = new Set<number>();

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
        this.requestFrame(() => this.registerOverlay());
        return;
      }

      this.releaseOverlay();
    });
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
    const hadOverlay = this.overlayRef !== null;
    this.releaseOverlay(options.restoreFocus ?? true);

    if (!hadOverlay && (options.restoreFocus ?? true)) {
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
    this.releaseOverlay(false);
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
    this.requestFrame(() => this.layer?.nativeElement.querySelector<HTMLElement>('.chatbot-action')?.focus());
  }

  private restoreFocus(): void {
    this.requestFrame(() => {
      const target = this.opener?.isConnected ? this.opener : this.launcherButton?.nativeElement;
      target?.focus();
      this.opener = null;
    });
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

  private registerOverlay(): void {
    const layer = this.layer?.nativeElement;
    if (!this.isOpen() || !layer || this.overlayRef) {
      return;
    }

    this.overlayRef = this.overlayStack.open({
      element: layer,
      opener: this.opener,
      initialFocus: this.dialogTitle?.nativeElement,
      requestClose: () => this.close(),
    });
  }

  private releaseOverlay(restoreFocus = true): void {
    const overlayRef = this.overlayRef;
    this.overlayRef = null;
    overlayRef?.close(restoreFocus);
    if (overlayRef) {
      this.opener = null;
    }
  }

  private prefersReducedMotion(): boolean {
    return this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false;
  }
}
