
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HttpClientModule } from '@angular/common/http';
import {provideHttpClient} from '@angular/common/http';
import {withFetch} from '@angular/common/http';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    HttpClientModule,
    provideHttpClient(withFetch()),
    provideRouter(routes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
