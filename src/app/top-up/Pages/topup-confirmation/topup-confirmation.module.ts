import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PinModalModule } from 'src/app/reusableComponents/pin-modal/pin-modal.module';
import { IonicModule } from '@ionic/angular';
import { TopupConfirmationPageRoutingModule } from './topup-confirmation-routing.module';
import { TopupConfirmationPage } from './topup-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinModalModule,
    TopupConfirmationPageRoutingModule,
  ],
  declarations: [TopupConfirmationPage],
})
export class TopupConfirmationPageModule {}
