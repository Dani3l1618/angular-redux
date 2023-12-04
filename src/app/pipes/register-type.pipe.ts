import { Pipe, PipeTransform } from '@angular/core';
import { RegisterType } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'registerType',
  standalone: true,
})
export class RegisterTypePipe implements PipeTransform {
  transform(type: RegisterType): string {
    const translate: Record<RegisterType, string> = {
      income: 'Ingreso',
      expense: 'Egreso',
    };

    return translate[type];
  }
}
