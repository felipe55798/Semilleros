import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './common/department/department.component';
import { GroupComponent } from './common/group/group.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DepartmentComponent,
    GroupComponent
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
    GroupComponent
  ]
})
export class ComponentsModule { }
