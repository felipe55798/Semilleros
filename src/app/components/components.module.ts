import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './common/department/department.component';
import { GroupComponent } from './common/group/group.component';
import { PublicationComponent } from './common/publication/publication.component';
import { EmptyComponent } from './common/shared/empty/empty.component';
import { SeedlingComponent } from './common/seedling/seedling.component';
import { HomeGroupComponent } from './groups/home-group/home-group.component';
import { RouterModule } from '@angular/router';
import { HomeSeedlingComponent } from './seedlings/home-seedling/home-seedling.component';
import { HomePublicationComponent } from './publications/home-publication/home-publication.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DepartmentComponent,
    GroupComponent,
    PublicationComponent,
    EmptyComponent,
    SeedlingComponent,
    HomeGroupComponent,
    HomeSeedlingComponent,
    HomePublicationComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    HomeGroupComponent,
    HomeSeedlingComponent,
    HomePublicationComponent
  ]
})
export class ComponentsModule { }