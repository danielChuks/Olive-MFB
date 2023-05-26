import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OtpPagePageRoutingModule } from './otp-page-routing.module';
import { OtpPagePage } from './otp-page.page';
import { ForgotPasswordService } from '../forgot-password.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpPagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OtpPagePage],
  providers:[ForgotPasswordService]
})
export class OtpPagePageModule {}
