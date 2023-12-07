import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/interfaces/user.model';
import {
  cargarUsuario,
  cargarUsuarioError,
  cargarUsuarioSuccess,
} from '../actions';

export interface UserState {
  id: string | null;
  user: User | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const initialUserState: UserState = {
  id: null,
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

const _userReducer = createReducer(
  initialUserState,

  on(cargarUsuario, (state, { id }) => ({ ...state, loading: true, id })),
  on(cargarUsuarioSuccess, (state, { user }) => ({
    ...state,
    loaded: true,
    loading: false,
    user: { ...user },
    error: null,
  })),
  on(cargarUsuarioError, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    user: null,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}
