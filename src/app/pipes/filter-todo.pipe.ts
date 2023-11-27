import { Pipe, PipeTransform } from '@angular/core';
import { FilterType } from '../filters/models/filter.model';
import { Todo } from '../todos/models/todo.model';

@Pipe({
  name: 'filterTodo',
})
export class FilterTodoPipe implements PipeTransform {
  transform(todos: Todo[], filter: FilterType): Todo[] {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter((todo) => !todo.completado);
      case 'completed':
        return todos.filter((todo) => todo.completado);
      default:
        return [];
    }
  }
}
