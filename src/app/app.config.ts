import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { isDevMode } from '@angular/core';
import { routes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { appState, reducer } from './store/app.state';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import * as effects from './store/app.effects';
import { apiInterceptor } from './interceptors/api.interceptor';
import { AppErrorHandlerService } from './core/services/app-error-handler.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'},
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandlerService
    },
    importProvidersFrom(MatSnackBarModule),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    ),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([apiInterceptor])
    ),
    provideStore(reducer),
    provideState(appState),
    provideEffects(effects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    })
  ]
};
