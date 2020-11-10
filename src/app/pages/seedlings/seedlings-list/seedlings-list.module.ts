import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeedlingsListPageRoutingModule } from './seedlings-list-routing.module';

import { SeedlingsListPage } from './seedlings-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SeedlingsListPageRoutingModule
  ],
  declarations: [SeedlingsListPage]
})
export class SeedlingsListPageModule {}
