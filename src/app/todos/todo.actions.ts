import { createAction, props } from '@ngrx/store';

export const createTodo = createAction(
  '[Todo] Crear Todo',
  props<{ texto: string }>()
);

export const updateTextTodo = createAction(
  '[Todo] Actulizar texto Todo',
  props<{ id: string; texto: string }>()
);

export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ id: string }>()
);

export const deleteTodo = createAction(
  '[Todo] delete Todo',
  props<{ id: string }>()
);

export const toggleAll = createAction(
  '[Todo] Toggle All Todo',
  props<{ completado: boolean }>()
);

export const cleanComplete = createAction('[Todo] Clean Complete');
