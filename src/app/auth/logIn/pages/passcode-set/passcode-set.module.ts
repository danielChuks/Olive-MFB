import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasscodeSetPageRoutingModule } from './passcode-set-routing.module';

import { PasscodeSetPage } from './passcode-set.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasscodeSetPageRoutingModule
  ],
  declarations: [PasscodeSetPage]
})
export class PasscodeSetPageModule {}
