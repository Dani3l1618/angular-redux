import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import {
  cleanComplete,
  createTodo,
  deleteTodo,
  toggleAll,
  toggleTodo,
  updateTextTodo,
} from './todo.actions';

export const initialTodoState: Todo[] = [
  new Todo('Comprar boletos'),
  new Todo('Imprimir boletos'),
  new Todo('Repartir boletos'),
  new Todo('Ir al evebto'),
];

const _todoReducer = createReducer(
  initialTodoState,
  on(createTodo, (state, action) => [...state, new Todo(action.texto)]),
  on(updateTextTodo, (state, { id, texto }) => {
    return state.map((item) => {
      if (item.id === id) {
        console.log(item.id, id);
        return { ...item, texto };
      }
      return item;
    });
  }),
  on(toggleTodo, (state, { id }) => {
    return state.map((item) => {
      if (item.id === id) return { ...item, completado: !item.completado };
      return item;
    });
  }),
  on(deleteTodo, (state, { id }) => {
    return state.filter((item) => item.id !== id);
  }),
  on(toggleAll, (state, { completado }) => {
    return state.map((item) => ({ ...item, completado }));
  }),
  on(cleanComplete, (state) => {
    return state.filter((todo) => !todo.completado);
  })
);

export function todoReducer(state: Todo[] | undefined, action: Action) {
  return _todoReducer(state, action);
}
