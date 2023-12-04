import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ingresoEgreoReducer } from '../ingreso-egreso/ingreso-egreso.reducer';
import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('ingresosEgresos', ingresoEgreoReducer)
      ),
    ],

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
