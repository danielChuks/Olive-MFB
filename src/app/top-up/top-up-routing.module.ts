import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopUpPage } from './top-up.page';

const routes: Routes = [
  {
    path: '',
    component: TopUpPage
  },  {
    path: 'topup-confirmation',
    loadChildren: () => import('./Pages/topup-confirmation/topup-confirmation.module').then( m => m.TopupConfirmationPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./Pages/success/success.module').then( m => m.SuccessPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopUpPageRoutingModule {}
