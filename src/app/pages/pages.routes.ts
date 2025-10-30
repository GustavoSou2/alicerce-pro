import { Routes } from '@angular/router';

export const pagesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing-page/landing-page').then((m) => m.LandingPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export const appRoutes: Routes = [
  {
    path: 'entrar',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: '**',
    redirectTo: 'entrar',
  },
];
