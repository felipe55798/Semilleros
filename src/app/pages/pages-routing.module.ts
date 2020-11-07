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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}