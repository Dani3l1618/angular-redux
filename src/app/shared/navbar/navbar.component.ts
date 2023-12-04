import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: ``,
  standalone: true,
})
export class NavbarComponent implements OnInit {
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
}
