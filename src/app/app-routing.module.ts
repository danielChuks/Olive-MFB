import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./splashscreen/splashscreen.module').then( m => m.SplashscreenPageModule)
  },
  {
    path: 'login-screen',
    loadChildren: () => import('./auth/logIn/pages/login-screen/login-screen.module').then( m => m.LoginScreenPageModule)
  },
  {
    path: 'pay-bills',
    loadChildren: () => import('./pay-bills/pay-bills.module').then( m => m.PayBillsPageModule)
  },

  {
    path: 'bills-activity',
    loadChildren: () => import('../app/pay-bills/pages/bills-activity/bills-activity.module').then( m => m.BillsActivityPageModule)
  },

  {
    path: 'bills-receipt',
    loadChildren: () => import('../app/pay-bills/pages/bills-receipt/bills-receipt.module').then( m => m.BillsReceiptPageModule)
  },
  {
    path: 'top-up',
    loadChildren: () => import('./top-up/top-up.module').then( m => m.TopUpPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
  },
  {
    path: 'transfer',
    loadChildren: () => import('./transfer/transfer.module').then( m => m.TransferPageModule),
    // canLoad: [AuthGuard]
  },

  {
    path: 'create-passcode',
    loadChildren: () => import('./auth/logIn/pages/create-passcode/create-passcode.module').then( m => m.CreatePasscodePageModule)
  },
  {
    path: 'confirm-passcode',
    loadChildren: () => import('./auth/logIn/pages/confirm-passcode/confirm-passcode.module').then( m => m.ConfirmPasscodePageModule)
  },
  {
    path: 'passcode-set',
    loadChildren: () => import('./auth/logIn/pages/passcode-set/passcode-set.module').then( m => m.PasscodeSetPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signIn/pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signup2',
    loadChildren: () => import('./auth/signIn/pages/signup2/signup2.module').then( m => m.Signup2PageModule)
  },
  {
    path: 'fill-form',
    loadChildren: () => import('./auth/signIn/pages/fill-form/fill-form.module').then( m => m.FillFormPageModule)
  },
  {
    path: 'other-transfer',
    loadChildren: () => import('./transfer/other-transfer/other-transfer.module').then( m => m.OtherTransferPageModule),
    // canActivate: [UnauthGuard]
  },
  {
    path: 'transaction-history',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./reusableComponents/transaction-history/transaction-history.module').then( m => m.TransactionHistoryPageModule)
  },
  {
    path: 'signup-form',
    loadChildren: () => import('./auth/Signup/pages/signup-form/signup-form.module').then( m => m.SignupFormPageModule)
  },
  {
    path: 'create-pin',
    loadChildren: () => import('./auth/Signup/pages/create-pin/create-pin.module').then( m => m.CreatePinPageModule)
  },
  {
    path: 'confirm-pin',
    loadChildren: () => import('./auth/Signup/pages/confirm-pin/confirm-pin.module').then( m => m.ConfirmPinPageModule)
  },
  {
    path: 'login-screen',
    loadChildren: () => import('./auth/logIn/pages/login-screen/login-screen.module').then( m => m.LoginScreenPageModule),
    // canActivate: [UnauthGuard]
  },
  {
    path: 'new-tab',
    loadChildren: () => import('./new-tab/new-tab.module').then( m => m.NewTabPageModule),
    // canLoad: [AuthGuard]
  },
  {
    path: 'hometab',
    loadChildren: () => import('./hometab/hometab.module').then( m => m.HometabPageModule),
  },

  {
    path: 'manage-beneficiaries',
    loadChildren: () => import('./manage-beneficiaries/manage-beneficiaries.module').then( m => m.ManageBeneficiariesPageModule)
  },

  {
    path: 'add-beneficiaries',
    loadChildren: () => import('./manage-beneficiaries/add-beneficiaries/add-beneficiaries.module').then( m => m.AddBeneficiariesPageModule)
  },

  {
    path: 'edit-beneficiaries',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./manage-beneficiaries/edit-beneficiaries/edit-beneficiaries.module').then( m => m.EditBeneficiariesPageModule)
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'card-management',
    loadChildren: () => import('./card-management/card-management.module').then( m => m.CardManagementPageModule)
  },
  {
    path: 'external-transfer-activity',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./transfer/external-transfer-activity/external-transfer-activity.module').then( m => m.ExternalTransferActivityPageModule)
  },
  {
    path: 'full-activity',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./transfer/full-activity/full-activity.module').then( m => m.FullActivityPageModule)
  },
  {
    path: 'ext-receipt',
    loadChildren: () => import('./transfer/ext-receipt/ext-receipt.module').then( m => m.ExtReceiptPageModule)
  },
  {
    path: 'change-pin-old',
    loadChildren: () => import('./profile/pages/change-pin-old/change-pin-old.module').then( m => m.ChangePinOldPageModule)
  },
  {
    path: 'change-pin-new',
    loadChildren: () => import('./profile/pages/change-pin-new/change-pin-new.module').then( m => m.ChangePinNewPageModule)
  },
  {
    path: 'change-pin-confirm',
    loadChildren: () => import('./profile/pages/change-pin-confirm/change-pin-confirm.module').then( m => m.ChangePinConfirmPageModule)
  },

    {
    path: 'welcomescreen',
    loadChildren: () => import('./auth/signIn/pages/welcomescreen/welcomescreen.module').then( m => m.WelcomescreenPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'success-page',
    loadChildren: () => import('./forgot-password/success-page/success-page.module').then( m => m.SuccessPagePageModule)
  },
  {
    path: 'otp-page',
    loadChildren: () => import('./forgot-password/otp-page/otp-page.module').then( m => m.OtpPagePageModule)
  },
  {
    path: 'forgot-pin-otp',
    loadChildren: () => import('../app/profile/pages/forgot-pin-otp/forgot-pin-otp.module').then( m => m.ForgotPinOtpPageModule)
  },
  {
    path: 'splashscreen',
    loadChildren: () => import('./splashscreen/splashscreen.module').then( m => m.SplashscreenPageModule)
  },  {
    path: 'landing-page',
    loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  }









];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
