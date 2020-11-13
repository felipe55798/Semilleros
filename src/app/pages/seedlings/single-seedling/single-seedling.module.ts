import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleSeedlingPageRoutingModule } from './single-seedling-routing.module';

import { SingleSeedlingPage } from './single-seedling.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SingleSeedlingPageRoutingModule
  ],
  declarations: [SingleSeedlingPage]
})
export class SingleSeedlingPageModule {}
