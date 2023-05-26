import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePinConfirmPage } from './change-pin-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePinConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePinConfirmPageRoutingModule {}
