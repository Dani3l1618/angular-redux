import { Provider } from '@angular/core';
import { RegisterTypePipe } from './register-type.pipe';
import { SortTypesPipe } from './sort-types.pipe';

export const COMMON_PIPES: Provider[] = [SortTypesPipe, RegisterTypePipe];
