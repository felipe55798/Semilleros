import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleProgramPageRoutingModule } from './single-program-routing.module';

import { SingleProgramPage } from './single-program.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleProgramPageRoutingModule
  ],
  declarations: [SingleProgramPage]
})
export class SingleProgramPageModule {}
