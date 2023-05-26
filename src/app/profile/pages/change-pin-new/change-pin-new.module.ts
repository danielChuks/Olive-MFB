import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePinNewPageRoutingModule } from './change-pin-new-routing.module';

import { ChangePinNewPage } from './change-pin-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePinNewPageRoutingModule
  ],
  declarations: [ChangePinNewPage]
})
export class ChangePinNewPageModule {}
