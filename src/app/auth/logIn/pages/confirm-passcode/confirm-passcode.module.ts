import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmPasscodePageRoutingModule } from './confirm-passcode-routing.module';

import { ConfirmPasscodePage } from './confirm-passcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPasscodePageRoutingModule
  ],
  declarations: [ConfirmPasscodePage]
})
export class ConfirmPasscodePageModule {}
