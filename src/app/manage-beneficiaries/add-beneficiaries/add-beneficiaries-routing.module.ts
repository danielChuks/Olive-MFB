import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBeneficiariesPage } from './add-beneficiaries.page';

const routes: Routes = [
  {
    path: '',
    component: AddBeneficiariesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBeneficiariesPageRoutingModule {}
