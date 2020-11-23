import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleProgramPage } from './single-program.page';

const routes: Routes = [
  {
    path: '',
    component: SingleProgramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleProgramPageRoutingModule {}
