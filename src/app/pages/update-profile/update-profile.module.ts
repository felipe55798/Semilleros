import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateProfilePageRoutingModule } from './update-profile-routing.module';

import { UpdateProfilePage } from './update-profile.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateProfilePageRoutingModule
  ],
  declarations: [UpdateProfilePage]
})
export class UpdateProfilePageModule {}
