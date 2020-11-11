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
      },
      {
        path: 'single-group/:id',
        loadChildren: () => import('./groups/single-group/single-group.module').then( m => m.SingleGroupPageModule)
      },
      {
        path: 'single-seedling/:id',
        loadChildren: () => import('./seedlings/single-seedling/single-seedling.module').then( m => m.SingleSeedlingPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}