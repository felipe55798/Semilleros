import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children:[
      {
        path:'',
        redirectTo:'groups'
      },
      {
        path:'groups',
        children:[
          {
            path:'',
            loadChildren: ()=>import('./groups/groups-list/groups-list.module').then(m=>m.GroupsListPageModule)
          },
          {
            path:'add',
            loadChildren: () => import('./admin/groups/add-group/add-group.module').then( m => m.AddGroupPageModule)
          }
        ]
      },
      {
        path: 'seedlings',
        children:[
          {
            path:'',
            loadChildren: ()=>import('./seedlings/seedlings-list/seedlings-list.module').then(m=>m.SeedlingsListPageModule)
          },
          {
            path:'add',
            loadChildren: () => import('./admin/seedlings/seedling-form/seedling-form.module').then( m => m.SeedlingFormPageModule)
          }
        ]
      },
      {
<<<<<<< HEAD
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
=======
        path:'departments',
        children:[
          {
            path: ':id',
            loadChildren: () => import('./departments/single-department/single-department.module').then( m => m.SingleDepartmentPageModule)
          }
        ]
>>>>>>> 76ca865cc044277b5aba38518ad823802df382bb
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}