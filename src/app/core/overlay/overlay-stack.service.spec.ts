import { TestBed } from '@angular/core/testing';

import { OverlayRef, OverlayStackService } from './overlay-stack.service';

describe('OverlayStackService', () => {
  let service: OverlayStackService;
  let refs: OverlayRef[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayStackService);
    refs = [];
    document.body.innerHTML = '';
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
  });

  afterEach(() => {
    for (const ref of refs.reverse()) {
      ref.close(false);
    }
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('inerts the page, traps Tab in both directions and restores the opener', () => {
    const opener = document.createElement('button');
    const host = document.createElement('div');
    const dialog = document.createElement('section');
    const first = document.createElement('button');
    const last = document.createElement('button');
    dialog.tabIndex = -1;
    dialog.append(first, last);
    host.append(dialog);
    document.body.append(opener, host);
    opener.focus();

    const ref = service.open({ element: dialog, initialFocus: dialog, requestClose: vi.fn() });
    refs.push(ref);

    expect(opener.inert).toBe(true);
    expect(document.body.style.position).toBe('fixed');
    expect(document.activeElement).toBe(dialog);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(first);

    first.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(last);

    ref.close();
    expect(opener.inert).toBe(false);
    expect(document.activeElement).toBe(opener);
  });

  it('sends Escape only to the top overlay and keeps scroll locked until the stack is empty', () => {
    const firstDialog = document.createElement('section');
    const secondDialog = document.createElement('section');
    document.body.append(firstDialog, secondDialog);
    const firstClose = vi.fn();
    const secondClose = vi.fn();
    const firstRef = service.open({ element: firstDialog, requestClose: firstClose });
    const secondRef = service.open({ element: secondDialog, requestClose: secondClose });
    refs.push(firstRef, secondRef);

    expect(firstDialog.inert).toBe(true);
    expect(secondDialog.inert).toBe(false);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));

    expect(firstClose).not.toHaveBeenCalled();
    expect(secondClose).toHaveBeenCalledOnce();
    secondRef.close(false);
    expect(document.body.style.position).toBe('fixed');

    firstRef.close(false);
    expect(document.body.style.position).toBe('');
    expect(document.body.style.overflow).toBe('');
  });

  it('redirects focus that starts outside the active overlay', () => {
    const outside = document.createElement('button');
    const dialog = document.createElement('section');
    const action = document.createElement('button');
    dialog.append(action);
    document.body.append(outside, dialog);
    const ref = service.open({ element: dialog, requestClose: vi.fn() });
    refs.push(ref);

    outside.focus();
    outside.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

    expect(document.activeElement).toBe(action);
  });
});
