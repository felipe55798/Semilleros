import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleSeedlingPage } from './single-seedling.page';

const routes: Routes = [
  {
    path: '',
    component: SingleSeedlingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleSeedlingPageRoutingModule {}
