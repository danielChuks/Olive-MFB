import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtReceiptPage } from './ext-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: ExtReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtReceiptPageRoutingModule {}
