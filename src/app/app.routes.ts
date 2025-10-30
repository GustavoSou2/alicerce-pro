import { Routes } from '@angular/router';
import { appRoutes, pagesRoutes } from './pages/pages.routes';

export const defRoutes: Routes = [...pagesRoutes];

const subdomain = window.location.hostname.split('.')[0];

export const routes = subdomain == 'www' || subdomain == 'localhost' ? defRoutes : appRoutes;
