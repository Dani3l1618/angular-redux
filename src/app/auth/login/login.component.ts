import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    if (this.loginForm.invalid) return;
    Swal.fire({
      title: 'Iniciando sesión',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.authService
        .login(email, password)
        .then((credential) => {
          Swal.close();
          // console.log(credential);
          this.router.navigate(['/']);
        })
        .catch((error) =>
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error',
            text: error.message,
          })
        );
    }
  }
}
