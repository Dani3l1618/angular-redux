import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss',
})
export class TodoAddComponent {
  todoForm = this.fb.group({
    text: [''],
  });
  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  addTodo(): void {
    const textForm = this.todoForm.get('text');
    const texto = textForm?.value;
    if (!texto) return;
    this.store.dispatch(actions.createTodo({ texto }));
    textForm?.setValue('');
  }
}
