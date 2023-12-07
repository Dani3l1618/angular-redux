import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import * as userActions from '../actions';

const getUser$ = (userService: UserService) =>
  userService.getUsers().pipe(
    map((users) => userActions.cargarUsuariosSuccess({ users })),
    catchError((error) =>
      of(userActions.cargarUsuariosError({ payload: error }))
    )
  );

export const loadUsers = createEffect(
  (action$ = inject(Actions), userService = inject(UserService)) => {
    return action$.pipe(
      ofType(userActions.cargarUsuarios),
      exhaustMap(() => getUser$(userService))
    );
  },
  { functional: true } //Se debe colocar el funciontal en true
);
