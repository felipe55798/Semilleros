import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleDepartmentPage } from './single-department.page';

const routes: Routes = [
  {
    path: '',
    component: SingleDepartmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleDepartmentPageRoutingModule {}
