import { createAction, props } from '@ngrx/store';
import { FilterType } from './models/filter.model';

export const setFilter = createAction(
  '[Filter] Set Filter',
  props<{ filter: FilterType }>()
);
