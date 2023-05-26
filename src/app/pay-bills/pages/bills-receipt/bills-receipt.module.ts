import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillsReceiptPageRoutingModule } from './bills-receipt-routing.module';

import { BillsReceiptPage } from './bills-receipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillsReceiptPageRoutingModule
  ],
  declarations: [BillsReceiptPage]
})
export class BillsReceiptPageModule {}
