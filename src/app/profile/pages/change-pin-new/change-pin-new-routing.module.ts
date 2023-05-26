import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePinNewPage } from './change-pin-new.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePinNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePinNewPageRoutingModule {}
