import { Provider } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

export const SHARED_COMPONENTS: Provider[] = [
  FooterComponent,
  NavbarComponent,
  SidebarComponent,
];
