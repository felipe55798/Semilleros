import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckRoleGuard } from '../guards/check-role.guard';
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
        canActivate:[CheckTokenGuard],
        children:[
          {
            path:'',
            canActivate:[CheckRoleGuard],
            data:{
              role: 1
            },
            loadChildren: () => import('./admin/groups/add-group/add-group.module').then( m => m.AddGroupPageModule),
          }
        ]
      },
      {
        path: ':id',
        loadChildren: () => import('./groups/single-group/single-group.module').then( m => m.SingleGroupPageModule)
      },
      {
        path:'edit/:id',
        canActivate:[CheckTokenGuard],
        children:[
          {
            path:'',
            canActivate:[CheckRoleGuard],
            data:{
              role: 1
            },
            loadChildren: () => import('./admin/groups/add-group/add-group.module').then( m => m.AddGroupPageModule),
          }
        ]
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
        children:[
          {
            path:'',
            canActivate:[CheckRoleGuard],
            data:{
              role: 1
            },
            loadChildren: () => import('./admin/seedlings/seedling-form/seedling-form.module').then( m => m.SeedlingFormPageModule),
          }
        ]
      },
      {
        path: ':id',
        loadChildren: () => import('./seedlings/single-seedling/single-seedling.module').then( m => m.SingleSeedlingPageModule)
      },
      {
        path:'edit/:id',
        canActivate:[CheckTokenGuard],
        children:[
          {
            path:'',
            canActivate:[CheckRoleGuard],
            data:{
              role: 1
            },
            loadChildren: () => import('./admin/seedlings/seedling-form/seedling-form.module').then( m => m.SeedlingFormPageModule),
          }
        ]
      },
    ]
  },
  {
    path:'departments',
    children:[
      {
        path:'add',
        canActivate:[CheckTokenGuard],
        children:[
          {
            path:'',
            canActivate:[CheckRoleGuard],
            data:{
              role: 1
            },
            loadChildren:()=>import('./admin/departments/form-department/form-department.module').then(m => m.FormDepartmentPageModule),
          }
        ],
      },
      {
        path: ':id',
        loadChildren: () => import('./departments/single-department/single-department.module').then( m => m.SingleDepartmentPageModule)
      },
      {
        path:'edit/:id',
        canActivate:[CheckTokenGuard],
        children:[
          {
            path:'',
            canActivate:[CheckRoleGuard],
            data:{
              role: 1
            },
            loadChildren:()=>import('./admin/departments/form-department/form-department.module').then(m => m.FormDepartmentPageModule),
          }
        ]
      }
    ]
  },
  {
    path:'lines',
    children:[
      {
        path: 'add',
        canActivate:[CheckTokenGuard],
        children:[
          {
            path:'',
            canActivate:[CheckRoleGuard],
            data:{
              role: 1
            },
            loadChildren: () => import('./admin/lines/line-form/line-form.module').then( m => m.LineFormPageModule),
          }
        ]
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
        canActivate:[CheckTokenGuard],
        children:[
          {
            path:'',
            canActivate:[CheckRoleGuard],
            data:{
              role: 1
            },
            loadChildren: ()=>import('./admin/programs/form-program/form-program.module').then(m => m.FormProgramPageModule),
          }
        ]
      },
      {
        path:'',
        canActivate:[CheckTokenGuard],
        loadChildren: () => import('./programs/programs-list/programs-list.module').then( m => m.ProgramsListPageModule),
      }
    ]
  },
  {
    path:'users',
    children:[
      {
        path: 'add',
        canActivate:[CheckTokenGuard],
        children:[
          {
            path:'',
            canActivate:[CheckRoleGuard],
            data:{
              role: 1
            },
            loadChildren: () => import('./admin/users/users-form/users-form.module').then( m => m.UsersFormPageModule),
          }
        ]
      },
      {
        path: ':id',
        loadChildren: () => import('./users/single-user/single-user.module').then( m => m.SingleUserPageModule)
      },
      {
        path: '',
        canActivate:[CheckTokenGuard],
        loadChildren: () => import('./users/users-list/users-list.module').then( m => m.UsersListPageModule),
      },
    ]
  },
  {
    path: 'publications',
    children:[
      {
        path:'add',
        canActivate:[CheckTokenGuard],
        children:[
          {
            path:'',
            canActivate:[CheckRoleGuard],
            data:{
              role: 2,
              role2: 3
            },
            loadChildren: () => import('./publications/form-publication/form-publication.module').then(m=>m.FormPublicationPageModule)
          }
        ]
      },
      {
        path: ':id',
        loadChildren: () => import('./publications/single-publication/single-publication.module').then( m => m.SinglePublicationPageModule)
      }
    ]
  },
  {
    path: 'update-profile',
    children:[
      {
        path: ':id',
        loadChildren: () => import('./update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
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