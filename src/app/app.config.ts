import {
  ApplicationConfig,
  provideZonelessChangeDetection,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi
} from '@angular/common/http';

import { routes } from './app.routes';
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),

    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(
      withFetch(),                    
      withInterceptorsFromDi(),       
      withInterceptors([loaderInterceptor]) 
    )
  ],
};
