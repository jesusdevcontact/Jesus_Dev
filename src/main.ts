import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {
  LucideArrowRight,
  LucideCheckCircle2,
  LucideCode2,
  LucideDatabase,
  LucideExternalLink,
  LucideMail,
  LucideMenu,
  LucideRocket,
  LucideShieldCheck,
  LucideSparkles,
  LucideTerminal,
  LucideWorkflow,
  LucideX,
  provideLucideIcons,
} from '@lucide/angular';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideLucideIcons(
      LucideArrowRight,
      LucideCheckCircle2,
      LucideCode2,
      LucideDatabase,
      LucideExternalLink,
      LucideMail,
      LucideMenu,
      LucideRocket,
      LucideShieldCheck,
      LucideSparkles,
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
