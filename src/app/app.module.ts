import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { TokenInjectionService } from './interceptors/token-injection.service';
import { CheckTokenService } from './interceptors/check-token.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],

  providers: [
    StatusBar,
    SplashScreen,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInjectionService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass: CheckTokenService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
