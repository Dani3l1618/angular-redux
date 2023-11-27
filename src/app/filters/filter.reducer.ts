import { Action, createReducer, on } from '@ngrx/store';
import { setFilter } from './filter.action';
import { Filter } from './models/filter.model';

export const initialFilter: Filter = {
  filter: 'all',
};

const _filterReducer = createReducer(
  initialFilter,
  on(setFilter, (state, { filter }) => ({ ...state, filter }))
);

export function filterReducer(state: Filter | undefined, action: Action) {
  return _filterReducer(state, action);
}
