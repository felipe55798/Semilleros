import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleDepartmentPageRoutingModule } from './single-department-routing.module';

import { SingleDepartmentPage } from './single-department.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SingleDepartmentPageRoutingModule
  ],
  declarations: [SingleDepartmentPage]
})
export class SingleDepartmentPageModule {}
