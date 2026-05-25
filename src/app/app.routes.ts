import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home-page.component').then((component) => component.HomePageComponent),
    title: 'Jesus Dev | Angular & Laravel Fullstack Developer',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
