import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExternalTransferActivityPageRoutingModule } from './external-transfer-activity-routing.module';
import { ExternalTransferActivityPage } from './external-transfer-activity.page';
import { PinModalModule } from 'src/app/reusableComponents/pin-modal/pin-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExternalTransferActivityPageRoutingModule,
    PinModalModule
  ],
  declarations: [ExternalTransferActivityPage]
})
export class ExternalTransferActivityPageModule {}
