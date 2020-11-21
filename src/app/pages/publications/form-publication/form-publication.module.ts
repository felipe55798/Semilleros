import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPublicationPageRoutingModule } from './form-publication-routing.module';

import { FormPublicationPage } from './form-publication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPublicationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormPublicationPage]
})
export class FormPublicationPageModule {}
