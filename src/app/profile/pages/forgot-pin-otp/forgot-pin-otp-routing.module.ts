import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPinOtpPage } from './forgot-pin-otp.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotPinOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPinOtpPageRoutingModule {}
