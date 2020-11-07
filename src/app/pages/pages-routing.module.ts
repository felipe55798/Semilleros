import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:'groups',
        loadChildren: ()=>import('./groups/groups-list/groups-list.module').then(m=>m.GroupsListPageModule)
      },
      {
        path:'seedlings',
        loadChildren: ()=>import('./seedlings/seedlings-list/seedlings-list.module').then(m=>m.SeedlingsListPageModule)
      },
      {
        path: 'single-department/:id',
        loadChildren: () => import('./departments/single-department/single-department.module').then( m => m.SingleDepartmentPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}