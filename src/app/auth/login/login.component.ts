import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import Swal from 'sweetalert2';

import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private store: Store<AppState> = inject(Store<AppState>);

  isLoading: boolean = false;

  constructor() {
    this.store
      .select('ui')
      .pipe(takeUntilDestroyed())
      .subscribe((ui) => {
        this.isLoading = ui.isLoading;
      });
  }

  loginForm = this.fb.group({
    email: ['daniel1@gmail.com', Validators.required],
    password: ['password', Validators.required],
  });

  login() {
    if (this.loginForm.invalid) return;
    console.log('dispatching');
    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Iniciando sesión',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.authService
        .login(email, password)
        .then((credential) => {
          // Swal.close();
          // console.log(credential);
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error',
            text: error.message,
          });
        });
    }
  }
}
