import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ComponentsModule
  ]
})
export class AuthModule { }
