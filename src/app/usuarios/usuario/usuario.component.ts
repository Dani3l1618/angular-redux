import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../models/interfaces/user.model';
import { cargarUsuario } from '../../store/actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario.component.html',
  styles: ``,
})
export class UsuarioComponent implements OnInit {
  private router = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private store: Store<AppState> = inject(Store);

  user: User | null = null;
  loading: boolean = false;
  error: any = null;

  ngOnInit(): void {
    this.listenStore();

    this.router.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ id }) => this.getUser(id));
  }

  listenStore(): void {
    this.store
      .select('usuario')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ user, loading, error }) => {
        console.log(user);
        this.user = user;
        this.loading = loading;
        this.error = error;
      });
  }

  getUser(id: string): void {
    this.store.dispatch(cargarUsuario({ id }));
  }
}
