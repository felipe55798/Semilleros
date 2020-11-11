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
    path:'',
    pathMatch: 'full',
    redirectTo:'groups'
  },  {
    path: 'programs-list',
    loadChildren: () => import('./programs/programs-list/programs-list.module').then( m => m.ProgramsListPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}