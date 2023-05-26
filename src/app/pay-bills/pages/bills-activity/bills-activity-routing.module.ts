import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillsActivityPage } from './bills-activity.page';

const routes: Routes = [
  {
    path: '',
    component: BillsActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsActivityPageRoutingModule {}
