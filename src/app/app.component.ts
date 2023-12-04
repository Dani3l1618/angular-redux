import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {
  private authService = inject(AuthService);

  constructor() {
    this.authService.initAuthListener();
  }
}
