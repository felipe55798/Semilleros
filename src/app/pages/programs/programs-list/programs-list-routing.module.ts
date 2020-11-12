import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramsListPage } from './programs-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramsListPageRoutingModule {}
