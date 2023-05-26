import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenerateOtpComponent } from './generate-otp.component';
import { ForgotPasswordService } from 'src/app/forgot-password/forgot-password.service';


@NgModule({
  declarations: [GenerateOtpComponent],
  imports: [
    CommonModule,
    IonicModule, FormsModule,
    ReactiveFormsModule
  ],
  exports: [GenerateOtpComponent],
  providers:[ForgotPasswordService]
})
export class GenerateOtpModule { }
