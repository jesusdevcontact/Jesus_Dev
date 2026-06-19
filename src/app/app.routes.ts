import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home-page.component').then((component) => component.HomePageComponent),
    title: 'Jesús Martínez Escobar | Desarrollador Full Stack Angular y Laravel',
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./features/legal/legal-page.component').then((component) => component.LegalPageComponent),
    data: { page: 'privacy' },
    title: 'Política de privacidad | Jesús Martínez Escobar',
  },
  {
    path: 'cookies',
    loadComponent: () =>
      import('./features/legal/legal-page.component').then((component) => component.LegalPageComponent),
    data: { page: 'cookies' },
    title: 'Política de cookies | Jesús Martínez Escobar',
  },
  {
    path: 'legal',
    loadComponent: () =>
      import('./features/legal/legal-page.component').then((component) => component.LegalPageComponent),
    data: { page: 'legal' },
    title: 'Aviso legal | Jesús Martínez Escobar',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact-page.component').then((component) => component.ContactPageComponent),
    title: 'Contacto | Jesús Martínez Escobar',
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
