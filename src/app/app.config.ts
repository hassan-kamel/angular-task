// Angular
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Prime Angular
import { ToastModule } from 'primeng/toast';

// Local
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      ToastModule,
      RouterModule.forRoot(routes),
      ReactiveFormsModule
    ),
    AuthService,
    MessageService,
  ],
};
