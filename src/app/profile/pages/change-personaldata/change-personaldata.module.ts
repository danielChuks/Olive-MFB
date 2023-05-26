import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePersonaldataPageRoutingModule } from './change-personaldata-routing.module';

import { ChangePersonaldataPage } from './change-personaldata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePersonaldataPageRoutingModule
  ],
  declarations: [ChangePersonaldataPage]
})
export class ChangePersonaldataPageModule {}
