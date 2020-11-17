import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinglePublicationPage } from './single-publication.page';

const routes: Routes = [
  {
    path: '',
    component: SinglePublicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinglePublicationPageRoutingModule {}
