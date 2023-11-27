import { v4 } from 'uuid';

export class Todo {
  public id: string;
  public completado: boolean = false;
  constructor(public texto: string) {
    this.id = v4();
  }
}
