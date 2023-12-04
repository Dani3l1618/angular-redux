import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { authRoutes } from './auth/auth.routes';
// import  dashboardRoutes  from './dashboard/dashboard.routes';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.routes') },
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.routes'),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
