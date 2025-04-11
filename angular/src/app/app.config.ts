import { ApplicationConfig } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: []
};
