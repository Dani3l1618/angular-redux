import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./usuarios/lista/lista.component').then((c) => c.ListaComponent),
  },
  {
    path: 'usuario/:id',
    loadComponent: () =>
      import('./usuarios/usuario/usuario.component').then(
        (c) => c.UsuarioComponent
      ),
  },
  { path: '**', redirectTo: 'home' },
];
