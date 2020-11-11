import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleLinePageRoutingModule } from './single-line-routing.module';

import { SingleLinePage } from './single-line.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleLinePageRoutingModule
  ],
  declarations: [SingleLinePage]
})
export class SingleLinePageModule {}
