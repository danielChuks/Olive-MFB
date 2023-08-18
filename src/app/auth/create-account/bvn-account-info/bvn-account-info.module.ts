import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BvnAccountInfoPageRoutingModule } from './bvn-account-info-routing.module';

import { BvnAccountInfoPage } from './bvn-account-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BvnAccountInfoPageRoutingModule
  ],
  declarations: [BvnAccountInfoPage]
})
export class BvnAccountInfoPageModule {}
