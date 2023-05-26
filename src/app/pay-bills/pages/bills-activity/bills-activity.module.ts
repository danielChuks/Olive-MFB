import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BillsActivityPageRoutingModule } from './bills-activity-routing.module';
import { BillsActivityPage } from './bills-activity.page';
import { PinModalModule } from 'src/app/reusableComponents/pin-modal/pin-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinModalModule,
    BillsActivityPageRoutingModule
  ],
  declarations: [BillsActivityPage]
})
export class BillsActivityPageModule {}
