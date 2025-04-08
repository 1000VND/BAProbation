import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppBaseModule } from './app/app-base.module';

platformBrowserDynamic().bootstrapModule(AppBaseModule)
  .catch((err) => console.error(err));
