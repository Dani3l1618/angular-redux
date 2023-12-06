import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_PROVIDER } from './app/app.provider';

bootstrapApplication(AppComponent, {
  providers: [APP_PROVIDER],
}).catch((error) => console.log(error));
