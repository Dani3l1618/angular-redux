import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styles: `
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    appearance: none; 
}

  /* Firefox */
  input[type=number] {
      -moz-appearance: textfield;
  }
  `,
})
export class NavbarComponent {
  // @ViewChild('txtInput') inputText?: ElementRef<HTMLInputElement>;
  private router: Router = inject(Router);

  searchUser(userId: string) {
    if (!userId || isNaN(+userId)) return;
    this.router.navigate(['/usuario', userId.trim()]);
  }
}
