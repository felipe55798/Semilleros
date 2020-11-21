import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPublicationPage } from './form-publication.page';

const routes: Routes = [
  {
    path: '',
    component: FormPublicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPublicationPageRoutingModule {}
