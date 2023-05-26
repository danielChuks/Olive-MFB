import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FillFormPage } from './fill-form.page';

const routes: Routes = [
  {
    path: '',
    component: FillFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FillFormPageRoutingModule {}
