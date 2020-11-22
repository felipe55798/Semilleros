import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglePublicationPageRoutingModule } from './single-publication-routing.module';

import { SinglePublicationPage } from './single-publication.page';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinglePublicationPageRoutingModule
  ],
  declarations: [SinglePublicationPage],
  providers: [
    InAppBrowser
  ]
})
export class SinglePublicationPageModule {}
