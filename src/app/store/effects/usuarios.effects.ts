import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import * as userActions from '../actions';

@Injectable()
export class UsuariosEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  private getUser$ = this.userService.getUsers().pipe(
    map((users) => userActions.cargarUsuariosSuccess({ users })),
    catchError((error) =>
      of(userActions.cargarUsuariosError({ payload: error }))
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.cargarUsuarios),
      exhaustMap(() => this.getUser$),
      catchError(() => EMPTY)
    )
  );
}
