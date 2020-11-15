import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleUserPageRoutingModule } from './single-user-routing.module';

import { SingleUserPage } from './single-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleUserPageRoutingModule
  ],
  declarations: [SingleUserPage]
})
export class SingleUserPageModule {}
