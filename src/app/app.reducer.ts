import { ActionReducerMap } from '@ngrx/store';
// import * as ui from './shared/ui.reducer.ts';
import { AuthState, authReducer } from './auth/auth.reducer';
import { UiState, uiReducer } from './shared/ui.reducer';

export interface AppState {
  ui: UiState;
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer,
};
