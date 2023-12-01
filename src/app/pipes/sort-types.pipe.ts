import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'sortTypes',
})
export class SortTypesPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return [...items].sort((a, b) => {
      if (a.type === 'income') return -1;
      return 1;
    });
  }
}
