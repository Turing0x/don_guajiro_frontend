import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httphandlerrorsInterceptor } from './common/interceptors/httphandleerrors.interceptor';
import { authenticationInterceptor } from './common/interceptors/authentication.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      httphandlerrorsInterceptor,
      authenticationInterceptor
    ])),]
};
