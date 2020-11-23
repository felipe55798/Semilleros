import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramsListPageRoutingModule } from './programs-list-routing.module';

import { ProgramsListPage } from './programs-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramsListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProgramsListPage]
})
export class ProgramsListPageModule {}
