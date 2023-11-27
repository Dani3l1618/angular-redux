import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as filterAction from '../../filters/filter.action';
import { FilterType } from '../../filters/models/filter.model';
import * as todoAction from '../todo.actions';
import { FooterFilters } from './model/todo-footer.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.scss',
})
export class TodoFooterComponent {
  filterSelected: FilterType = 'all';
  filters: FooterFilters[] = [
    { id: 1, filterType: 'all', desc: 'Todos' },
    { id: 2, filterType: 'active', desc: 'Activos' },
    { id: 3, filterType: 'completed', desc: 'Completados' },
  ];
  pendingTask: number = 0;
  hasCompletedTask: boolean = false;
  hasTodos: boolean = false;

  constructor(private store: Store<AppState>) {
    this.store.subscribe(({ filter, todos }) => {
      this.filterSelected = filter.filter;
      this.hasTodos = todos.length > 0;
      this.pendingTask = todos.filter((item) => !item.completado).length;
      this.hasCompletedTask =
        todos.filter((todo) => todo.completado).length > 0;
    });
  }

  changeFilter(filter: FilterType) {
    this.store.dispatch(filterAction.setFilter({ filter }));
  }

  cleanComplete(): void {
    this.store.dispatch(todoAction.cleanComplete());
  }
}
