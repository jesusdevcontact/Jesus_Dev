import { TestBed } from '@angular/core/testing';
import { NavigationEnd, provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

import { AppComponent } from './app.component';

describe('AppComponent navigation focus', () => {
  let frameCallbacks: FrameRequestCallback[];

  beforeEach(() => {
    frameCallbacks = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frameCallbacks.push(callback);
      return frameCallbacks.length;
    });
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([]), provideTranslateService({ fallbackLang: 'es', lang: 'es' })],
    });
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [],
        template: '<main><h1>Contact</h1><section id="projects">Projects</section></main>',
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('focuses the fragment after navigating from another route', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component['handleNavigation'](new NavigationEnd(1, '/contact', '/contact'));
    component['handleNavigation'](new NavigationEnd(2, '/#projects', '/#projects'));
    frameCallbacks.shift()?.(0);

    const projects = fixture.nativeElement.querySelector('#projects') as HTMLElement;
    expect(projects.getAttribute('tabindex')).toBe('-1');
    expect(document.activeElement).toBe(projects);
  });
});
