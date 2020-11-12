import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleLinePage } from './single-line.page';

const routes: Routes = [
  {
    path: '',
    component: SingleLinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleLinePageRoutingModule {}
