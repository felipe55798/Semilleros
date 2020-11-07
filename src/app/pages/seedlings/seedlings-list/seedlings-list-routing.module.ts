import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeedlingsListPage } from './seedlings-list.page';

const routes: Routes = [
  {
    path: '',
    component: SeedlingsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeedlingsListPageRoutingModule {}
