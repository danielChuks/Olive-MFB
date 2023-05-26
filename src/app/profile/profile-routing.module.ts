import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'forgot-pin',
    loadChildren: () => import('./pages/forgot-pin/forgot-pin.module').then( m => m.ForgotPinPageModule)
  },
  {
    path: 'success-page',
    loadChildren: () => import('./pages/success-page/success-page.module').then( m => m.SuccessPagePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },  {
    path: 'change-personaldata',
    loadChildren: () => import('./pages/change-personaldata/change-personaldata.module').then( m => m.ChangePersonaldataPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
