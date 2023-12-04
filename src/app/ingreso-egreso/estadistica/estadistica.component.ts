import {
  Component,
  DestroyRef,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppStateWithIngresoEgresoState } from '../../app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { COMMON_INGRESS_MODULE } from '../ingreso-egreso.shared';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: ``,
  standalone: true,
  imports: [COMMON_INGRESS_MODULE, ChartComponent],
})
export class EstadisticaComponent implements OnInit {
  private store: Store<AppStateWithIngresoEgresoState> = inject(Store);
  private destroyRef = inject(DestroyRef);

  registers: WritableSignal<IngresoEgreso[]> = signal([]);
  incomes: Signal<IngresoEgreso[]> = computed(() =>
    this.registers().filter((register) => register.type === 'income')
  );

  expenses: Signal<IngresoEgreso[]> = computed(() =>
    this.registers().filter((register) => register.type === 'expense')
  );

  totalIncomes: Signal<number> = computed(() => {
    return this.incomes().reduce((p, c) => p + c.amount, 0);
  });

  totalExpenses: Signal<number> = computed(() => {
    return this.expenses().reduce((p, c) => p + c.amount, 0);
  });

  diference: Signal<number> = computed(
    () => this.totalIncomes() - this.totalExpenses()
  );

  chartLabels: string[] = ['Ingresos', 'Egresos'];
  series: Signal<number[][]> = computed(() => {
    return [[this.totalIncomes(), this.totalExpenses()]];
  });

  ngOnInit(): void {
    this.store
      .select('ingresosEgresos')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ items }) => this.registers.set(items));
  }
}
