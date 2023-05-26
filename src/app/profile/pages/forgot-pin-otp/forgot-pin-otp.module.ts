import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPinOtpPageRoutingModule } from './forgot-pin-otp-routing.module';

import { ForgotPinOtpPage } from './forgot-pin-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPinOtpPageRoutingModule
  ],
  declarations: [ForgotPinOtpPage]
})
export class ForgotPinOtpPageModule {}
