import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardManagementPage } from './card-management.page';

const routes: Routes = [
  {
    path: '',
    component: CardManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardManagementPageRoutingModule {}
