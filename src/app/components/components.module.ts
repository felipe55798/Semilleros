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
import { ProfileComponent } from './profile/profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { CodeComponent } from './auth/password/code/code.component';
import { RecoverPage } from '../pages/auth/password/recover/recover.page';
import { RecoveryComponent } from './auth/password/recovery/recovery.component';



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
    ProfileComponent,
    UpdatePasswordComponent,
    HeaderActionComponent,
    CodeComponent,
    RecoveryComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    EmptyComponent,
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
    ProfileComponent,
    UpdatePasswordComponent,
    HeaderActionComponent,
    CodeComponent,
    RecoveryComponent
  ]
})
export class ComponentsModule { }