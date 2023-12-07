import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { User } from '../../models/interfaces/user.model';
import { AlertComponent } from '../../shared/alert/alert.component';
import { cargarUsuarios } from '../../store/actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './lista.component.html',
  styles: ``,
})
export class ListaComponent implements OnInit {
  // private userService = inject(UserService);
  private store: Store<AppState> = inject(Store);
  private destroyRef = inject(DestroyRef);

  users: User[] = [];
  loading: boolean = false;
  error: any = null;

  ngOnInit(): void {
    this.initStore();
    this.getUsers();
  }

  initStore(): void {
    this.store
      .select('usuarios')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ users, loading, error }) => {
        this.users = users;
        this.loading = loading;
        this.error = error;
      });
  }

  getUsers(): void {
    this.store.dispatch(cargarUsuarios());
  }
}
