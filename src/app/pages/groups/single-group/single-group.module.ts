import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleGroupPageRoutingModule } from './single-group-routing.module';

import { SingleGroupPage } from './single-group.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SingleGroupPageRoutingModule
  ],
  declarations: [SingleGroupPage]
})
export class SingleGroupPageModule {}
