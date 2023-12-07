# NGRX usando effects

Los efectos son acciones que se disparan al momento de nosotros disparar un action. 

En esta sección usamos efectos para llamar a una API. Y al estar en Angular 17, se usaron standalone compoents y effectFunctions. 

Para más información ver la [docu](https://ngrx.io/guide/effects).

## ¿Cómo funciona?
Nosotros tenemos acciones, por ejemplo, "Cargar Usuario", al hacer un dispatch de esta acción, se dispara el efecto porque al configurar el efecto le decimos que escuche a ese evento. 

Luego, en el mismo efecto, disparamos las acciones "Usuario cargado success" o "Usuario Cargado error".

Para que el effect solo escuche una acción, usamos un pipe que nos da la librería que se llama "ofType":

``` typescript
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import {
  cargarUsuario,
  cargarUsuarioError,
  cargarUsuarioSuccess,
} from '../actions';

// A mi se me hizo bueno separar al observable que obtiene al usuario. El observable viene del servicio y lo mapeamos para que dispare una acción en cuanto se cargue el usuario de la API o emita la acción de error.

const user$ = (id: string, userService: UserService) => {
  return userService.getUser(id).pipe(
    map((user) => cargarUsuarioSuccess({ user })),
    catchError((error) => of(cargarUsuarioError({ payload: error })))
  );
};

// Este es el effect, y es el que se agregar en el provider del app. Nota que la función *createEffect* recibe dos servicios injectados (gracias a la versión de Angular) y retornamos el action pero transformado por los pipes. 
// Nota: podemos usar diferentes pipes en vez de  exhaustMap, todo depende de nuestra necesidad, el operador debe retornar un observable. ver docu.
//Por último, al ser una effectFunction, se debe agregar un parámetro extra: {functional: true}
export const loadUser = createEffect(
  (action$ = inject(Actions), userService = inject(UserService)) => {
    return action$.pipe(
      ofType(cargarUsuario),
      exhaustMap(({ id }) => user$(id, userService))
    );
  },
  { functional: true }
);

```

Para que angular sepa de nuestros efectos, los pasamos en el provider:

```typescript

import { Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { appReducers } from './store/app.reducers';
// import { UsuariosEffects } from './store/effects/usuarios.effects';

// Asi se debe importar a los efects, estos estan en un idex.ts
import * as userEffects from './store/effects';

export const APP_PROVIDER: Provider = [
  provideStore(appReducers),

  provideEffects(userEffects),
  // provideEffects(UsuariosEffects), //Si se requiere usar una class Effect
];
```

### ClassEfect

En versiones antiguas se puede usar una clase (o servicio), con el decorador @Injectable.

``` typescript

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

```