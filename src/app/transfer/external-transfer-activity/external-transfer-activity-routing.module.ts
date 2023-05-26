import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExternalTransferActivityPage } from './external-transfer-activity.page';

const routes: Routes = [
  {
    path: '',
    component: ExternalTransferActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExternalTransferActivityPageRoutingModule {}
