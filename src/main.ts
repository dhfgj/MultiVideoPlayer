import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import {MVPService} from './app/mvp.service';
import {OVERLAY_CONTAINER_TOKEN} from '@angular2-material/core/overlay/overlay';
import {createOverlayContainer} from '@angular2-material/core/overlay/overlay-container';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';


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
    FIREBASE_PROVIDERS,
    // Initialize Firebase app  
  defaultFirebase({
        apiKey: "AIzaSyDDs2Xb_TOvXL1GwrDL_wu9wA0lOovazvo",
    authDomain: "multi-video-player.firebaseapp.com",
    databaseURL: "https://multi-video-player.firebaseio.com",
    storageBucket: "multi-video-player.appspot.com",
  })
]);

