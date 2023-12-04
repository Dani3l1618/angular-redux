import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../ingreso-egreso/estadistica/estadistica.component').then(
            (c) => c.EstadisticaComponent
          ),
      },
      {
        path: 'ingreso-egreso',
        loadComponent: () =>
          import('../ingreso-egreso/ingreso-egreso.component').then(
            (c) => c.IngresoEgresoComponent
          ),
      },
      {
        path: 'detalle',
        loadComponent: () =>
          import('../ingreso-egreso/detalle/detalle.component').then(
            (c) => c.DetalleComponent
          ),
      },
    ],
  },
];

export default dashboardRoutes;
