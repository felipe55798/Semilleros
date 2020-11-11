import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleGroupPage } from './single-group.page';

const routes: Routes = [
  {
    path: '',
    component: SingleGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleGroupPageRoutingModule {}
