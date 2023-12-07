import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import {
  cargarUsuario,
  cargarUsuarioError,
  cargarUsuarioSuccess,
} from '../actions';

const user$ = (id: string, userService: UserService) => {
  return userService.getUser(id).pipe(
    map((user) => cargarUsuarioSuccess({ user })),
    catchError((error) => of(cargarUsuarioError({ payload: error })))
  );
};

export const loadUser = createEffect(
  (action$ = inject(Actions), userService = inject(UserService)) => {
    return action$.pipe(
      ofType(cargarUsuario),
      exhaustMap(({ id }) => user$(id, userService))
    );
  },
  { functional: true }
);
