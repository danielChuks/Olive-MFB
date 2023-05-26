import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePersonaldataPage } from './change-personaldata.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePersonaldataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePersonaldataPageRoutingModule {}
