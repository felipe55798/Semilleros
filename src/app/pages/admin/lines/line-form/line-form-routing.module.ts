import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LineFormPage } from './line-form.page';

const routes: Routes = [
  {
    path: '',
    component: LineFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LineFormPageRoutingModule {}
