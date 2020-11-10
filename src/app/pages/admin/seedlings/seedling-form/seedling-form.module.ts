import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeedlingFormPageRoutingModule } from './seedling-form-routing.module';

import { SeedlingFormPage } from './seedling-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeedlingFormPageRoutingModule
  ],
  declarations: [SeedlingFormPage]
})
export class SeedlingFormPageModule {}
