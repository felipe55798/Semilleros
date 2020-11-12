import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinesListPageRoutingModule } from './lines-list-routing.module';

import { LinesListPage } from './lines-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LinesListPageRoutingModule
  ],
  declarations: [LinesListPage]
})
export class LinesListPageModule {}
