import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherTransferPage } from './other-transfer.page';

const routes: Routes = [
  {
    path: '',
    component: OtherTransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherTransferPageRoutingModule {}
