import { createAction, props } from '@ngrx/store';
import { User } from '../../models/interfaces/user.model';

export const cargarUsuarios = createAction('[Usuarios] Cargar Usuarios');
export const cargarUsuariosSuccess = createAction(
  '[Usuarios] Cargar Usuarios Success',
  props<{ users: User[] }>()
);
export const cargarUsuariosError = createAction(
  '[Usuarios] Cargar Usuarios Error',
  props<{ payload: any }>()
);
