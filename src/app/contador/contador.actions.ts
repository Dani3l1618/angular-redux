import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Contador] Incrementar');

export const decrement = createAction('[Contador] Decrementar');

export const multiplicar = createAction(
  '[Contador] Multiplicar',
  props<{ value: number }>()
);

export const dividir = createAction(
  '[Contador] Dividir',
  props<{ value: number }>()
);

export const reset = createAction('[Contador] Reset');
