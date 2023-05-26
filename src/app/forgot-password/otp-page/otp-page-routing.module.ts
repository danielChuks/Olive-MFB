import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpPagePage } from './otp-page.page';

const routes: Routes = [
  {
    path: '',
    component: OtpPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpPagePageRoutingModule {}
