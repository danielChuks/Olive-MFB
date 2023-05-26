import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferPage } from './transfer.page';

const routes: Routes = [
  {
    path: '',
    component: TransferPage
  },
  {
    path: 'full-activity',
    loadChildren: () => import('./full-activity/full-activity.module').then( m => m.FullActivityPageModule)
  },
  {
    path: 'receipt',
    loadChildren: () => import('./receipt/receipt.module').then( m => m.ReceiptPageModule)
  },
  {
    path: 'other-transfer',
    loadChildren: () => import('./other-transfer/other-transfer.module').then( m => m.OtherTransferPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferPageRoutingModule {}
