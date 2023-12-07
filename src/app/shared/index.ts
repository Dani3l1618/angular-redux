import { Provider } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';

export const SHARED_COMPONENTS: Provider[] = [NavbarComponent, AlertComponent];
