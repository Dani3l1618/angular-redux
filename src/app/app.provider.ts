import { provideHttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_ROUTES } from './app.routes';
import { appReducers } from './store/app.reducers';
// import { UsuariosEffects } from './store/effects/usuarios.effects';
import * as userEffects from './store/effects';

export const APP_PROVIDER: Provider = [
  provideRouter(APP_ROUTES),
  provideHttpClient(),
  provideStore(appReducers),
  provideStoreDevtools({ maxAge: 25, logOnly: true }),
  provideEffects(userEffects),
  // provideEffects(UsuariosEffects),
];
