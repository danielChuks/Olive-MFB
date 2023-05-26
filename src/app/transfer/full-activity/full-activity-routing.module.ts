import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullActivityPage } from './full-activity.page';

const routes: Routes = [
  {
    path: '',
    component: FullActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullActivityPageRoutingModule {}
