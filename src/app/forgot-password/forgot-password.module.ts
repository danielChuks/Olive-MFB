import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordPage } from './forgot-password.page';
import { ForgotPasswordService } from './forgot-password.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotPasswordPage],
  providers:[ForgotPasswordService]
})
export class ForgotPasswordPageModule {}
