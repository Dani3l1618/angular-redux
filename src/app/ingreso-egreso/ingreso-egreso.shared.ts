import { CurrencyPipe, NgClass } from '@angular/common';
import { Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { COMMON_PIPES } from '../pipes';

export const COMMON_INGRESS_MODULE: Provider[] = [
  ReactiveFormsModule,
  NgClass,
  CurrencyPipe,
  COMMON_PIPES,
];
