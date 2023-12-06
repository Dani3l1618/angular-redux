import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SHARED_COMPONENTS } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [SHARED_COMPONENTS, RouterModule],
})
export class AppComponent {
  title = 'angular-redux';
}
