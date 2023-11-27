import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import TodoItemComponent from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodosPageComponent } from './todos-page/todos-page.component';

@NgModule({
  declarations: [
    TodoAddComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoFooterComponent,
    TodosPageComponent,
  ],

  imports: [CommonModule, ReactiveFormsModule, PipesModule],
  exports: [TodosPageComponent],
})
export class TodoModule {}
