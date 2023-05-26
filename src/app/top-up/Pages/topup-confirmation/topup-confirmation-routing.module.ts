import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopupConfirmationPage } from './topup-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: TopupConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopupConfirmationPageRoutingModule {}
