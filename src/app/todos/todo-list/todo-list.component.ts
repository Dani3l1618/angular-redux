import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { FilterType } from '../../filters/models/filter.model';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todos: Todo[] = [];
  filter: FilterType = 'all';

  constructor(private store: Store<AppState>) {
    this.store.subscribe(({ todos, filter }) => {
      this.todos = todos;
      this.filter = filter.filter;
    });
  }
}
