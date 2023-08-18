import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountOptionsPage } from './account-options.page';

const routes: Routes = [
  {
    path: '',
    component: AccountOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountOptionsPageRoutingModule {}
