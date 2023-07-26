import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KycInfoPageRoutingModule } from './kyc-info-routing.module';

import { KycInfoPage } from './kyc-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    KycInfoPageRoutingModule
  ],
  declarations: [KycInfoPage]
})
export class KycInfoPageModule {}
