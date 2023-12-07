import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../models/interfaces/user.model';
import {
  cargarUsuarios,
  cargarUsuariosError,
  cargarUsuariosSuccess,
} from '../actions';

export interface UsersState {
  users: User[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const initialUsersState: UsersState = {
  users: [],
  loaded: false,
  loading: false,
  error: null,
};

const _usersReducer = createReducer(
  initialUsersState,

  on(cargarUsuarios, (state) => ({ ...state, loading: true })),
  on(cargarUsuariosSuccess, (state, { users }) => ({
    ...state,
    loaded: true,
    loading: false,
    users: [...users],
    error: null,
  })),
  on(cargarUsuariosError, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message,
    },
  }))
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return _usersReducer(state, action);
}
