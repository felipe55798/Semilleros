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



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DepartmentComponent,
    GroupComponent,
    PublicationComponent,
    EmptyComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    DepartmentComponent,
    GroupComponent,
    PublicationComponent,
    EmptyComponent
  ]
})
export class ComponentsModule { }
