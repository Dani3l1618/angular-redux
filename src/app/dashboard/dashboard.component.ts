import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

import { RouterModule } from '@angular/router';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { SHARED_COMPONENTS } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``,
  standalone: true,
  imports: [SHARED_COMPONENTS, RouterModule],
})
export class DashboardComponent implements OnInit {
  private ingresoEgresoService = inject(IngresoEgresoService);
  private destroyedRef = inject(DestroyRef);
  private store: Store<AppState> = inject(Store);

  ngOnInit(): void {
    this.getIngresosEgresos();
  }

  getIngresosEgresos(): void {
    this.ingresoEgresoService.userId$
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe((userId) => {
        if (!userId) return;
        // const response =
        this.ingresoEgresoService
          .initIngresoEgreoListener()
          .pipe(takeUntilDestroyed(this.destroyedRef))
          .subscribe((data: any) => {
            this.store.dispatch(ingresoEgresoActions.setItems({ items: data }));
          });
      });
  }
}
