import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckTokenGuard } from '../guards/check-token.guard';


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
        loadChildren: () => import('./admin/groups/add-group/add-group.module').then( m => m.AddGroupPageModule),
        canActivate:[CheckTokenGuard]
      },
      {
        path: ':id',
        loadChildren: () => import('./groups/single-group/single-group.module').then( m => m.SingleGroupPageModule)
      },
      {
        path:'edit/:id',
        loadChildren: () => import('./admin/groups/add-group/add-group.module').then( m => m.AddGroupPageModule),
        canActivate:[CheckTokenGuard]
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
        loadChildren: () => import('./admin/seedlings/seedling-form/seedling-form.module').then( m => m.SeedlingFormPageModule),
        canActivate:[CheckTokenGuard]
      },
      {
        path: ':id',
        loadChildren: () => import('./seedlings/single-seedling/single-seedling.module').then( m => m.SingleSeedlingPageModule)
      },
      {
        path:'edit/:id',
        loadChildren: () => import('./admin/seedlings/seedling-form/seedling-form.module').then( m => m.SeedlingFormPageModule),
        canActivate:[CheckTokenGuard]
      },
    ]
  },
  {
    path:'departments',
    children:[
      {
        path:'add',
        loadChildren:()=>import('./admin/departments/form-department/form-department.module').then(m => m.FormDepartmentPageModule),
        canActivate:[CheckTokenGuard]
      },
      {
        path: ':id',
        loadChildren: () => import('./departments/single-department/single-department.module').then( m => m.SingleDepartmentPageModule)
      },
      {
        path:'edit/:id',
        loadChildren:()=>import('./admin/departments/form-department/form-department.module').then(m => m.FormDepartmentPageModule),
        canActivate:[CheckTokenGuard]
      }
    ]
  },
  {
    path:'lines',
    children:[
      {
        path: 'add',
        loadChildren: () => import('./admin/lines/line-form/line-form.module').then( m => m.LineFormPageModule),
        canActivate:[CheckTokenGuard]
      },
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
        loadChildren: ()=>import('./admin/programs/form-program/form-program.module').then(m => m.FormProgramPageModule),
        canActivate:[CheckTokenGuard]
      },
      {
        path:'',
        loadChildren: () => import('./programs/programs-list/programs-list.module').then( m => m.ProgramsListPageModule),
        canActivate:[CheckTokenGuard]
      }
    ]
  },
  {
    path:'users',
    children:[
      {
        path: 'add',
        loadChildren: () => import('./admin/users/users-form/users-form.module').then( m => m.UsersFormPageModule),
        canActivate:[CheckTokenGuard]
      },
      {
        path: ':id',
        loadChildren: () => import('./users/single-user/single-user.module').then( m => m.SingleUserPageModule)
      },
      {
        path: '',
        loadChildren: () => import('./users/users-list/users-list.module').then( m => m.UsersListPageModule),
        canActivate:[CheckTokenGuard]
      },
    ]
  },
  {
    path: 'publications',
    children:[
      {
        path: ':id',
        loadChildren: () => import('./publications/single-publication/single-publication.module').then( m => m.SinglePublicationPageModule)
      }
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