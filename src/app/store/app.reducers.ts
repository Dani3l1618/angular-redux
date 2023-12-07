import { ActionReducerMap } from '@ngrx/store';
import { UserState, UsersState, userReducer, usersReducer } from './reducers';

export interface AppState {
  usuarios: UsersState;
  usuario: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  usuarios: usersReducer,
  usuario: userReducer,
};
