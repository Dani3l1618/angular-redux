import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styles: ``,
})
export class AlertComponent {
  @Input({ required: true })
  message: string = '';

  @Input()
  type: 'alert-info' | 'alert-danger' = 'alert-info';
}
