import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {provideRemoteConfig, getRemoteConfig, fetchAndActivate, RemoteConfig} from '@angular/fire/remote-config';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideRemoteConfig(() => {
      const rc = getRemoteConfig();
      rc.settings = {
        minimumFetchIntervalMillis: environment.production ?43200000 : 10000, fetchTimeoutMillis:60000
      };

      fetchAndActivate(rc);
      return rc;
    })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
