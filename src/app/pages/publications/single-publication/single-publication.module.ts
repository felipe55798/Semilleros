import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglePublicationPageRoutingModule } from './single-publication-routing.module';

import { SinglePublicationPage } from './single-publication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinglePublicationPageRoutingModule
  ],
  declarations: [SinglePublicationPage]
})
export class SinglePublicationPageModule {}
