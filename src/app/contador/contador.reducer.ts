import { Action, createReducer, on } from '@ngrx/store';
import {
  decrement,
  dividir,
  increment,
  multiplicar,
  reset,
} from './contador.actions';

export const initialState = 0;

const _contadorReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(multiplicar, (state, { value }) => state * value),
  on(dividir, (state, { value }) => state / value),
  on(reset, () => initialState)
);

export function contadorReducer(state: number | undefined, action: Action) {
  return _contadorReducer(state, action);
}
