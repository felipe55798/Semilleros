import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineFormPageRoutingModule } from './line-form-routing.module';

import { LineFormPage } from './line-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LineFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LineFormPage]
})
export class LineFormPageModule {}
