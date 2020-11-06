import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoLoggedInGuard } from './guards/no-logged-in.guard';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule),
    canActivate:[NoLoggedInGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'tabs'
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
