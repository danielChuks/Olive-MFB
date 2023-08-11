import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BvnAccountPage } from './bvn-account.page';

const routes: Routes = [
  {
    path: '',
    component: BvnAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BvnAccountPageRoutingModule {}
