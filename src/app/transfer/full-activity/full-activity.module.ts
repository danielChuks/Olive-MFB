import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FullActivityPageRoutingModule } from './full-activity-routing.module';
import { FullActivityPage } from './full-activity.page';
import { TransferService } from '../transfer.service';
import { BeneficiariesService } from 'src/app/manage-beneficiaries/beneficiaries.service';
import { PinModalModule } from '../../reusableComponents/pin-modal/pin-modal.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullActivityPageRoutingModule,
    PinModalModule
  ],
  declarations: [FullActivityPage],
  providers:[TransferService, BeneficiariesService]
})
export class FullActivityPageModule {}
