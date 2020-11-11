import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormProgramPageRoutingModule } from './form-program-routing.module';

import { FormProgramPage } from './form-program.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormProgramPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormProgramPage]
})
export class FormProgramPageModule {}
