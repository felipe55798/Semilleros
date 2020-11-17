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
import { OneGroupComponent } from './groups/one-group/one-group.component';
import { HomeGroupComponent } from './groups/home-group/home-group.component';
import { RouterModule } from '@angular/router';
import { HomeSeedlingComponent } from './seedlings/home-seedling/home-seedling.component';
import { HomePublicationComponent } from './publications/home-publication/home-publication.component';
import { HeaderActionComponent } from './common/shared/header-action/header-action.component';
import { OneSeedlingComponent } from './seedlings/one-seedling/one-seedling.component';
import { OneProgramComponent } from './programs/one-program/one-program.component';
import { OneLineComponent } from './lines/one-line/one-line.component';
import { UserComponent } from './common/user/user.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DepartmentComponent,
    GroupComponent,
    PublicationComponent,
    EmptyComponent,
    SeedlingComponent,
    OneGroupComponent,
    OneSeedlingComponent,
    OneProgramComponent,
    OneLineComponent,
    UserComponent,
    HomeGroupComponent,
    HomeSeedlingComponent,
    HomePublicationComponent,
    HeaderActionComponent
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
    HomePublicationComponent,
    OneGroupComponent,
    OneSeedlingComponent,
    OneProgramComponent,
    OneLineComponent,
    PublicationComponent,
    UserComponent,
    DepartmentComponent,
    HeaderActionComponent
  ]
})
export class ComponentsModule { }