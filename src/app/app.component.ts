import { Component, WritableSignal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import * as actions from './contador/contador.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-redux';
  contador: WritableSignal<number> = signal(0);

  constructor(private store: Store<AppState>) {
    store.select('contador').subscribe((contador) => {
      this.contador.set(contador);
    });
  }

  increment(value = 1) {
    this.store.dispatch(actions.increment());
  }

  decrement(value = 1) {
    this.store.dispatch(actions.decrement());
  }
}
