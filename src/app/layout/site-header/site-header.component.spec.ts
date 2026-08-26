import { provideLucideIcons, LucideMenu, LucideMoon, LucideSun, LucideX } from '@lucide/angular';
import { provideTranslateService } from '@ngx-translate/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { SiteHeaderComponent } from './site-header.component';

describe('SiteHeaderComponent', () => {
  let frameCallbacks: FrameRequestCallback[];

  beforeEach(() => {
    frameCallbacks = [];
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    );
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frameCallbacks.push(callback);
      return frameCallbacks.length;
    });
    TestBed.configureTestingModule({
      imports: [SiteHeaderComponent],
      providers: [
        provideRouter([]),
        provideTranslateService({ fallbackLang: 'es', lang: 'es' }),
        provideLucideIcons(LucideMenu, LucideMoon, LucideSun, LucideX),
      ],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    TestBed.resetTestingModule();
  });

  it('focuses the first item on open and restores the toggle on Escape', async () => {
    const fixture = TestBed.createComponent(SiteHeaderComponent);
    await fixture.whenStable();
    const toggle = fixture.nativeElement.querySelector('.nav-toggle') as HTMLButtonElement;

    toggle.click();
    fixture.detectChanges();
    frameCallbacks.splice(0).forEach((callback) => callback(0));

    expect(fixture.componentInstance.menuOpen()).toBe(true);
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('.site-nav a'));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.menuOpen()).toBe(false);
    expect(document.activeElement).toBe(toggle);
  });

  it('closes on an outside pointer and when crossing the desktop breakpoint', async () => {
    const fixture = TestBed.createComponent(SiteHeaderComponent);
    await fixture.whenStable();
    const toggle = fixture.nativeElement.querySelector('.nav-toggle') as HTMLButtonElement;

    toggle.click();
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(fixture.componentInstance.menuOpen()).toBe(false);

    toggle.click();
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1024);
    window.dispatchEvent(new Event('resize'));
    expect(fixture.componentInstance.menuOpen()).toBe(false);
  });

  it('uses Angular routing for home fragments', async () => {
    const fixture = TestBed.createComponent(SiteHeaderComponent);
    await fixture.whenStable();
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const projectsLink = fixture.nativeElement.querySelector('.site-nav a') as HTMLAnchorElement;

    projectsLink.click();

    expect(navigateSpy).toHaveBeenCalledOnce();
    const destination = navigateSpy.mock.calls[0][0];
    expect(typeof destination === 'string' ? destination : router.serializeUrl(destination)).toBe('/#projects');
  });
});
