import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckTokenGuard } from '../guards/check-token.guard';


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
            canActivate:[CheckTokenGuard],
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
            canActivate:[CheckTokenGuard],
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
            path: 'add',
            canActivate:[CheckTokenGuard],
            loadChildren: () => import('./admin/departments/form-department/form-department.module').then( m => m.FormDepartmentPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('./departments/single-department/single-department.module').then( m => m.SingleDepartmentPageModule)
          }
        ]
<<<<<<< HEAD
      },
      {
        path:'programs',
        children:[
          {
            path: 'add',
            canActivate:[CheckTokenGuard],
            loadChildren: () => import('./admin/programs/form-program/form-program.module').then( m => m.FormProgramPageModule)
          }       
        ]
=======
>>>>>>> 76ca865cc044277b5aba38518ad823802df382bb
>>>>>>> 7fc350f087d69ddb13d5cb0eb04257ab129815d5
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}