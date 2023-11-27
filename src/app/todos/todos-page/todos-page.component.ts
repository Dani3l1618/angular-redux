import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as action from '../todo.actions';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss',
})
export class TodosPageComponent {
  completado: boolean = false;

  constructor(private store: Store<AppState>) {}

  toggleAll() {
    this.completado = !this.completado;
    this.store.dispatch(action.toggleAll({ completado: this.completado }));
  }
}
