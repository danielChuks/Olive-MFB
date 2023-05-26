import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgotPinPageRoutingModule } from './forgot-pin-routing.module';
import { ForgotPinPage } from './forgot-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ForgotPinPageRoutingModule
  ],
  declarations: [ForgotPinPage],
})
export class ForgotPinPageModule {}
