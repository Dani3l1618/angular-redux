import { Action, createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItems, unsetItems } from './ingreso-egreso.actions';

export interface ingresoEgresoState {
  items: IngresoEgreso[];
}

export const initialState: ingresoEgresoState = {
  items: [],
};

const _ingresoEgreoReducer = createReducer(
  initialState,

  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unsetItems, (state) => ({ ...state, items: [] }))
);

export function ingresoEgreoReducer(
  state: ingresoEgresoState | undefined,
  action: Action
) {
  return _ingresoEgreoReducer(state, action);
}
