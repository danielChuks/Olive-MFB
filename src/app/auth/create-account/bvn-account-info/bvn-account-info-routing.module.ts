import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BvnAccountInfoPage } from './bvn-account-info.page';

const routes: Routes = [
  {
    path: '',
    component: BvnAccountInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BvnAccountInfoPageRoutingModule {}
