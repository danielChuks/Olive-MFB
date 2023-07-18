import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccesspagePage } from './successpage.page';

const routes: Routes = [
  {
    path: '',
    component: SuccesspagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccesspagePageRoutingModule {}
