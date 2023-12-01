import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: ``,
})
export class DetalleComponent {
  private store: Store<AppState> = inject(Store);
  private ingresoEgresoService = inject(IngresoEgresoService);

  ingresosEgresos: IngresoEgreso[] = [];

  constructor() {
    this.store
      .select('ingresosEgresos')
      .pipe(takeUntilDestroyed())
      .subscribe(({ items }) => (this.ingresosEgresos = items));
  }

  async delete(uid: string) {
    const success = await this.ingresoEgresoService.deleteRegister(uid);
    if (success) {
      Swal.fire('Éxito', 'Registro eliminado', 'success');
    } else {
      Swal.fire('Error', 'Ocurrio un error al eliminar el registro', 'error');
    }
  }
}
