import { createAction, props } from '@ngrx/store';
import { User } from '../../models/interfaces/user.model';

export const cargarUsuario = createAction(
  '[Usuario] Cargar Usuario',
  props<{ id: string }>()
);

export const cargarUsuarioSuccess = createAction(
  '[Usuario] Cargar Usuario Success',
  props<{ user: User }>()
);

export const cargarUsuarioError = createAction(
  '[Usuario] Cargar Usuario Error',
  props<{ payload: any }>()
);
