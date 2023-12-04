import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const APP_ROUTES: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.routes') },
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.routes'),
    canMatch: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
