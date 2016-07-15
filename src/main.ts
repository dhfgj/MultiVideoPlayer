import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import {MVPService} from './app/mvp.service';
import {OVERLAY_CONTAINER_TOKEN} from '@angular2-material/core/overlay/overlay';
import {createOverlayContainer} from '@angular2-material/core/overlay/overlay-container';


import {disableDeprecatedForms, provideForms } from '@angular/forms';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,[
  HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  MVPService,
  {provide: OVERLAY_CONTAINER_TOKEN, useValue: createOverlayContainer()},
]);

