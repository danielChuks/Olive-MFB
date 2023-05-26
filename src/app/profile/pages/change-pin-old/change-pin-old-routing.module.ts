import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePinOldPage } from './change-pin-old.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePinOldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePinOldPageRoutingModule {}
