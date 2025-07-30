import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
  withFetch,
} from '@angular/common/http';
import { routes } from './app.routes';
import { interceptor401Interceptor } from './core/interceptor401-interceptor';
import { provideStore } from '@ngrx/store';
import { cartReducer } from './state/book/cart.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([interceptor401Interceptor])),
    provideHttpClient(withFetch()),
    provideStore({ cart: cartReducer }),
  ],
};
