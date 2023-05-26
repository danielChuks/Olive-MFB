import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfirmPinPageRoutingModule } from './confirm-pin-routing.module';
import { ConfirmPinPage } from './confirm-pin.page';
import { RegisterDeviceService } from '../../register-device.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPinPageRoutingModule
  ],
  declarations: [ConfirmPinPage],
  providers:[RegisterDeviceService]
})
export class ConfirmPinPageModule {}
