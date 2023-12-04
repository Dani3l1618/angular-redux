import { Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export const COMMON_AUTH_MODULES: Provider[] = [
  RouterModule,
  ReactiveFormsModule,
];
