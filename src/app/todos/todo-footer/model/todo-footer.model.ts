import { FilterType } from '../../../filters/models/filter.model';

export interface FooterFilters {
  id: number;
  filterType: FilterType;
  desc: string;
}
