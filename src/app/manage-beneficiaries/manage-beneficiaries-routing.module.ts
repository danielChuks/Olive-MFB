import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBeneficiariesPage } from './manage-beneficiaries.page';
import { BeneficiariesService } from './beneficiaries.service';

const routes: Routes = [
  {
    path: '',
    component: ManageBeneficiariesPage
  },
  {
    path: 'add-beneficiaries',
    loadChildren: () => import('./add-beneficiaries/add-beneficiaries.module').then( m => m.AddBeneficiariesPageModule)
  },
  {
    path: 'edit-beneficiaries',
    loadChildren: () => import('./edit-beneficiaries/edit-beneficiaries.module').then( m => m.EditBeneficiariesPageModule)
  },  {
    path: 'modal-page',
    loadChildren: () => import('./modal-page/modal-page.module').then( m => m.ModalPagePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BeneficiariesService]
})
export class ManageBeneficiariesPageRoutingModule {}
