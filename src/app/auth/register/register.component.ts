import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder) {}

  submit() {
    if (this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;
    if (name && email && password) {
      Swal.fire({
        title: 'Creando cuenta',
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this.authService
        .createUser(name, email, password)
        .then((credenciales) => {
          Swal.close();
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
