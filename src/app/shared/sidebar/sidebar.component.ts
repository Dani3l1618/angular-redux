import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  logout() {
    this.authService.logout().then(() => this.router.navigate(['/login']));
  }
}
