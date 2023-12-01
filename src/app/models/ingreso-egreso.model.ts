export type RegisterType = 'income' | 'expense';

export class IngresoEgreso {
  constructor(
    public description: string,
    public amount: number,
    public type: RegisterType,
    public uid: string = ''
  ) {}
}
