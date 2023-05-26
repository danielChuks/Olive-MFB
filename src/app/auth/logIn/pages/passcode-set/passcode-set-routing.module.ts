import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasscodeSetPage } from './passcode-set.page';

const routes: Routes = [
  {
    path: '',
    component: PasscodeSetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasscodeSetPageRoutingModule {}
