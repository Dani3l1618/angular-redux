import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { setUser, unsetUser } from './auth.actions';

export interface AuthState {
  user?: Usuario;
}

export const initialState: AuthState = {
  user: undefined,
};

const _authReducer = createReducer(
  initialState,

  on(setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(unsetUser, (state) => ({ ...state, user: undefined }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
