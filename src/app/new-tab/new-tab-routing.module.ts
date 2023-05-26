/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTabPage } from './new-tab.page';

const routes: Routes = [
  {
    path: '',
    component: NewTabPage,

   children: [
     {
      path: 'hometab',
      children:[
        {
          path:'',
          loadChildren: () => import('../hometab/hometab.module').then(m => m.HometabPageModule)
        },

        {
          path:'transfer',
          loadChildren: () => import('../transfer/transfer.module').then(m=> m.TransferPageModule)
        },

        {
          path:'other-transfer',
          loadChildren: () => import('../transfer/other-transfer/other-transfer.module').then(m=> m.OtherTransferPageModule)
        },

        {
          path:'transaction-history',
          loadChildren: () => import('../reusableComponents/transaction-history/transaction-history.module').then(m=> m.TransactionHistoryPageModule)
        },

        {
          path:'top-up',
          loadChildren:()=> import('../top-up/top-up.module').then(m=> m.TopUpPageModule)
        },
      ]

     },

     {
      path: 'card-management',
      loadChildren: () => import('../card-management/card-management.module').then(m => m.CardManagementPageModule)
     },


     {
      path: 'profile',
      children:[
        {
          path:'',
          loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
        },
        {
          path: 'create-pin',
          loadChildren: () => import('../auth/Signup/pages/create-pin/create-pin.module').then(m => m.CreatePinPageModule)
         },
         {
          path: 'forgot-pin',
          loadChildren: () => import('../profile/pages/forgot-pin/forgot-pin.module').then(m => m.ForgotPinPageModule)
         },

         {
          path: 'success-page',
          loadChildren: () => import('../profile/pages/success-page/success-page.module').then(m => m.SuccessPagePageModule)
         },

      ]

     },
   ]
  },

  {
    path: '',
    redirectTo: './new-tab/hometab',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTabPageRoutingModule {}
