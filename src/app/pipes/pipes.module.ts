import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterTodoPipe } from './filter-todo.pipe';

@NgModule({
  declarations: [FilterTodoPipe],
  imports: [CommonModule],
  exports: [FilterTodoPipe],
})
export class PipesModule {}
