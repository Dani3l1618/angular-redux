import { ActionReducerMap } from '@ngrx/store';
import { filterReducer } from './filters/filter.reducer';
import { Filter } from './filters/models/filter.model';
import { Todo } from './todos/models/todo.model';
import { todoReducer } from './todos/todo.reducer';

export interface AppState {
  todos: Todo[];
  filter: Filter;
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filter: filterReducer,
};
