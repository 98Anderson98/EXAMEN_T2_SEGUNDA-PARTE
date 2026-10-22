import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: 'productos',
        loadComponent: () => import('./pages/productos/productos').then((m) => m.Productos),
      },
      { path: '', pathMatch: 'full', redirectTo: 'productos' },
    ],
  },
  { path: '**', redirectTo: '' },
];
