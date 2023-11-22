import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { dividir, multiplicar } from '../contador.actions';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: ``,
})
export class HijoComponent implements OnInit {
  contador: WritableSignal<number> = signal(0);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('contador').subscribe({
      next: (contador) => {
        this.contador?.set(contador);
      },
    });
  }

  multiplicar(value = 2) {
    this.store.dispatch(multiplicar({ value }));
  }

  dividir(value = 2) {
    this.store.dispatch(dividir({ value }));
  }
}
