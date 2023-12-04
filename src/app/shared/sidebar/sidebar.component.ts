import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
  standalone: true,
  imports: [RouterModule],
})
export class SidebarComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private store: Store<AppState> = inject(Store);
  private destroyRef = inject(DestroyRef);

  userName = signal('');

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ user }) => {
        this.userName.set(user?.name ?? '');
      });
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(['/auth/login']));
  }
}
