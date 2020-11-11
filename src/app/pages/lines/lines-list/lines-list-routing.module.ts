import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinesListPage } from './lines-list.page';

const routes: Routes = [
  {
    path: '',
    component: LinesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinesListPageRoutingModule {}
