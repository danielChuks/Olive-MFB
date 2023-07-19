import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KycInfoPageRoutingModule } from './kyc-info-routing.module';

import { KycInfoPage } from './kyc-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KycInfoPageRoutingModule
  ],
  declarations: [KycInfoPage]
})
export class KycInfoPageModule {}
