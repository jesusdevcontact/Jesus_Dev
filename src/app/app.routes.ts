import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home-page.component').then((component) => component.HomePageComponent),
    title: 'Jesus Dev | Angular & Laravel Fullstack Developer',
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
    path: '**',
    redirectTo: '',
  },
];
