import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';
import * as ui from '../../shared/ui.actions';
import { COMMON_AUTH_MODULES } from '../auth.shared';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``,
  standalone: true,
  imports: [COMMON_AUTH_MODULES],
})
export class RegisterComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  isLoading = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store
      .select('ui')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ isLoading }) => {
        this.isLoading = isLoading;
      });
  }

  submit() {
    if (this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;
    this.store.dispatch(ui.isLoading());
    if (name && email && password) {
      //   Swal.fire({
      //     title: 'Creando cuenta',
      //     didOpen: () => {
      //       Swal.showLoading();
      //     },
      //   });

      this.authService
        .createUser(name, email, password)
        .then((credenciales) => {
          // Swal.close();
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
