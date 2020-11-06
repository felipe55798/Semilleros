import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsListPageRoutingModule } from './groups-list-routing.module';

import { GroupsListPage } from './groups-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsListPageRoutingModule
  ],
  declarations: [GroupsListPage]
})
export class GroupsListPageModule {}
