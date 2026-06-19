import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home-page.component').then((component) => component.HomePageComponent),
    title: 'Jesus Dev | Angular & Laravel Full Stack Developer',
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./features/legal/legal-page.component').then((component) => component.LegalPageComponent),
    data: { page: 'privacy' },
    title: 'Privacy Policy | Jesus Dev',
  },
  {
    path: 'cookies',
    loadComponent: () =>
      import('./features/legal/legal-page.component').then((component) => component.LegalPageComponent),
    data: { page: 'cookies' },
    title: 'Cookies Policy | Jesus Dev',
  },
  {
    path: 'legal',
    loadComponent: () =>
      import('./features/legal/legal-page.component').then((component) => component.LegalPageComponent),
    data: { page: 'legal' },
    title: 'Legal Notice | Jesus Dev',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact-page.component').then((component) => component.ContactPageComponent),
    title: 'Contact | Jesus Dev',
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./features/project-detail/project-detail-page.component').then((component) => component.ProjectDetailPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
