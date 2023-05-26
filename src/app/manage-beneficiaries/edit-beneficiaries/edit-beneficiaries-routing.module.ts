import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBeneficiariesPage } from './edit-beneficiaries.page';

const routes: Routes = [
  {
    path: '',
    component: EditBeneficiariesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBeneficiariesPageRoutingModule {}
