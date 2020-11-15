import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
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
      },
      {
        path: ':id',
        loadChildren: () => import('./groups/single-group/single-group.module').then( m => m.SingleGroupPageModule)
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
      },
      {
        path: ':id',
        loadChildren: () => import('./seedlings/single-seedling/single-seedling.module').then( m => m.SingleSeedlingPageModule)
      }
    ]
  },
  {
    path:'departments',
    children:[
      {
        path:'add',
        loadChildren:()=>import('./admin/departments/form-department/form-department.module').then(m => m.FormDepartmentPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./departments/single-department/single-department.module').then( m => m.SingleDepartmentPageModule)
      }
    ]
  },
  {
    path:'lines',
    children:[
      {
        path: '',
        loadChildren: () => import('./lines/lines-list/lines-list.module').then( m => m.LinesListPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./lines/single-line/single-line.module').then( m => m.SingleLinePageModule)
      }
    ]
  },
  {
    path:'programs',
    children:[
      {
        path:'add',
        loadChildren: ()=>import('./admin/programs/form-program/form-program.module').then(m => m.FormProgramPageModule)
      },
      {
        path:'',
        loadChildren: () => import('./programs/programs-list/programs-list.module').then( m => m.ProgramsListPageModule)
      }
    ]
  },
  {
    path:'users',
    children:[
      {
        path: 'add',
        loadChildren: () => import('./admin/users/users-form/users-form.module').then( m => m.UsersFormPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./users/single-user/single-user.module').then( m => m.SingleUserPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./users/users-list/users-list.module').then( m => m.UsersListPageModule)
      },
    ]
  },
  {
    path:'',
    pathMatch: 'full',
    redirectTo:'groups'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}