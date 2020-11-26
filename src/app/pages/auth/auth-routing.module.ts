import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: ()=>import('./authenticate/authenticate.module').then(m=>m.AuthenticatePageModule)
  },  {
    path: 'reset',
    loadChildren: () => import('./password/reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'recover',
    loadChildren: () => import('./password/recover/recover.module').then( m => m.RecoverPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
