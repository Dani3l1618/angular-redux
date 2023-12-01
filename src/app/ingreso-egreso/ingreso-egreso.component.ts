import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso, RegisterType } from '../models/ingreso-egreso.model';
import * as ui from '../shared/ui.actions';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: `
    .btn{
      transition: opacity 300ms;
    }
    .not-selected{
      opacity:0.5;
    }
  `,
})
export class IngresoEgresoComponent {
  private fb = inject(FormBuilder);
  private ingresoEgresoService = inject(IngresoEgresoService);
  private store: Store<AppState> = inject(Store);

  isLoading: boolean = false;

  constructor() {
    this.store
      .select('ui')
      .pipe(takeUntilDestroyed())
      .subscribe(({ isLoading }) => {
        this.isLoading = isLoading;
      });
  }

  get typeRecord() {
    return this.registerForm.get('type')?.value;
  }

  registerForm = this.fb.group({
    description: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0)]],
    type: ['', [Validators.required]],
  });

  setType(type: RegisterType) {
    this.registerForm.get('type')?.setValue(type);
  }

  generateRegister() {
    if (this.registerForm.invalid) return;
    const { amount, description, type } = this.registerForm.value;

    if (amount && description && type) {
      const newRegister = new IngresoEgreso(
        description,
        +amount,
        type as RegisterType
      );
      this.addRegister(newRegister);
    }
  }

  async addRegister(register: IngresoEgreso) {
    this.store.dispatch(ui.isLoading());
    try {
      const response = await this.ingresoEgresoService.crearIngresoEgreso(
        register
      );
      this.registerForm.reset();
    } catch (e) {
      Swal.fire('Error al crear registro', String(e), 'error');
    } finally {
      this.store.dispatch(ui.stopLoading());
    }
  }
}
