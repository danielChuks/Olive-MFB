import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupFormPageRoutingModule } from './signup-form-routing.module';
import { SignupFormPage } from './signup-form.page';
import { GenerateOtpModule } from 'src/app/reusableComponents/generate-otp/generate-otp.module';
import { ForgotPasswordService } from 'src/app/forgot-password/forgot-password.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SignupFormPageRoutingModule,
    GenerateOtpModule
  ],
  declarations: [SignupFormPage],
  providers:[ForgotPasswordService]
})
export class SignupFormPageModule {}
