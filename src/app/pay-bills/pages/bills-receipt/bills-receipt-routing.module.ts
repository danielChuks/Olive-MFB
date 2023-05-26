import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillsReceiptPage } from './bills-receipt.page';

const routes: Routes = [
  {
    path: '',
    component: BillsReceiptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsReceiptPageRoutingModule {}
