import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormProgramPage } from './form-program.page';

const routes: Routes = [
  {
    path: '',
    component: FormProgramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormProgramPageRoutingModule {}
