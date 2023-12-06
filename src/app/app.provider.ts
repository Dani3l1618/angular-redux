import { provideHttpClient } from '@angular/common/http';
import { Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';

export const APP_PROVIDER: Provider = [
  provideRouter(APP_ROUTES),
  provideHttpClient(),
];
