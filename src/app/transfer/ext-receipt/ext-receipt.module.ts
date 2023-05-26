import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtReceiptPageRoutingModule } from './ext-receipt-routing.module';

import { ExtReceiptPage } from './ext-receipt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtReceiptPageRoutingModule
  ],
  declarations: [ExtReceiptPage]
})
export class ExtReceiptPageModule {}
