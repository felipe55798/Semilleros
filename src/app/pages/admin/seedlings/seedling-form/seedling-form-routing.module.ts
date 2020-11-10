import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeedlingFormPage } from './seedling-form.page';

const routes: Routes = [
  {
    path: '',
    component: SeedlingFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeedlingFormPageRoutingModule {}
