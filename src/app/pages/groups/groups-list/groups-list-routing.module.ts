import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsListPage } from './groups-list.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsListPageRoutingModule {}
