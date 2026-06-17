import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  LucideArrowRight,
  LucideArrowUp,
  LucideCheckCircle2,
  LucideCode2,
  LucideCookie,
  LucideDatabase,
  LucideExternalLink,
  LucideGlobe,
  LucideMail,
  LucideMenu,
  LucideMoon,
  LucideRocket,
  LucideShieldCheck,
  LucideSparkles,
  LucideSun,
  LucideTerminal,
  LucideWorkflow,
  LucideX,
  provideLucideIcons,
} from '@lucide/angular';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideTranslateService({
      fallbackLang: 'es',
      lang: 'es',
      loader: provideTranslateHttpLoader({
        prefix: 'assets/i18n/',
        suffix: '.json',
      }),
    }),
    provideLucideIcons(
      LucideArrowRight,
      LucideArrowUp,
      LucideCheckCircle2,
      LucideCode2,
      LucideCookie,
      LucideDatabase,
      LucideExternalLink,
      LucideGlobe,
      LucideMail,
      LucideMenu,
      LucideMoon,
      LucideRocket,
      LucideShieldCheck,
      LucideSparkles,
      LucideSun,
      LucideTerminal,
      LucideWorkflow,
      LucideX,
    ),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
}).catch((error) => console.error(error));
