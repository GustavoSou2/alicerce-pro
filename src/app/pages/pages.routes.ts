import { Routes } from '@angular/router';
import { Navigation } from '../core/layout/navigation/navigation';
import { Dashboard } from '../features/dashboard/dashboard';
import { Budgets } from '../features/budgets/budgets';
import { Projects } from '../features/projects/projects';
import { Users } from '../features/users/users';
import { Clients } from '../features/clients/clients';
import { Material } from '../features/material/material';
import { UpsertBudget } from '../features/budgets/components/upsert-budget/upsert-budget';

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
    path: '',
    component: Navigation,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../features/dashboard/dashboard').then((c) => c.Dashboard),
      },
      {
        path: 'orcamentos',
        loadComponent: () => import('../features/budgets/budgets').then((c) => c.Budgets),
        children: [
          {
            path: 'novo',
            component: UpsertBudget,
          },
        ],
      },
      { path: 'projetos', component: Projects },
      { path: 'colaboradores', component: Users },
      { path: 'equipes', component: Users },
      { path: 'clientes', component: Clients },
      { path: 'materiais', component: Material },
      // outros módulos
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
  // {
  //   path: '**',
  //   redirectTo: 'entrar',
  // },
];
