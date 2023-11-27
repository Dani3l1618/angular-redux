import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Todo } from '../models/todo.model';
import { deleteTodo, toggleTodo, updateTextTodo } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export default class TodoItemComponent implements OnChanges {
  @Input({ required: true }) todoItem!: Todo;
  @ViewChild('txtInput') txtInput?: ElementRef<HTMLInputElement>;

  checkTodo: FormControl = new FormControl();
  txtForm: FormControl = new FormControl('', Validators.required);
  edit: boolean = false;

  constructor(private store: Store<AppState>) {}

  // ngOnInit(): void {

  // }
  ngOnChanges(changes: SimpleChanges): void {
    this.checkTodo.setValue(this.todoItem.completado);

    this.txtForm.setValue(this.todoItem.texto);
  }

  editMode() {
    if (this.todoItem.completado) return;

    this.edit = true;
    this.txtForm.setValue(this.todoItem.texto);
    setTimeout(() => {
      this.txtInput?.nativeElement.select();
    }, 0);
  }

  updateTxt() {
    this.edit = false;

    if (this.txtForm.invalid) return;

    const texto = this.txtForm.value;

    if (texto === this.todoItem.texto) return;

    this.store.dispatch(updateTextTodo({ id: this.todoItem.id, texto }));
  }

  toggle() {
    this.store.dispatch(toggleTodo({ id: this.todoItem.id }));
  }

  delete() {
    this.store.dispatch(deleteTodo({ id: this.todoItem.id }));
  }
}
