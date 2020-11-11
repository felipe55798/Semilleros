import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormDepartmentPageRoutingModule } from './form-department-routing.module';

import { FormDepartmentPage } from './form-department.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormDepartmentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormDepartmentPage]
})
export class FormDepartmentPageModule {}
