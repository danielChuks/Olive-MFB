import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayBillsPage } from './pay-bills.page';

const routes: Routes = [
  {
    path: '',
    component: PayBillsPage
  },
  {
    path: 'bills-activity',
    loadChildren: () => import('./pages/bills-activity/bills-activity.module').then( m => m.BillsActivityPageModule)
  },

  {
    path: 'bills-receipt',
    loadChildren: () => import('./pages/bills-receipt/bills-receipt.module').then( m => m.BillsReceiptPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayBillsPageRoutingModule {}
