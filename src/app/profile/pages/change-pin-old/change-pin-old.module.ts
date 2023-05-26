import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../profile.service';
import { IonicModule } from '@ionic/angular';

import { ChangePinOldPageRoutingModule } from './change-pin-old-routing.module';

import { ChangePinOldPage } from './change-pin-old.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePinOldPageRoutingModule
  ],
  declarations: [ChangePinOldPage],
    providers:[ProfileService]
})
export class ChangePinOldPageModule {}
