import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChangePinConfirmPageRoutingModule } from './change-pin-confirm-routing.module';
import { ChangePinConfirmPage } from './change-pin-confirm.page';
import { ProfileService } from '../../profile.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePinConfirmPageRoutingModule
  ],
  declarations: [ChangePinConfirmPage],
  providers:[ProfileService]
})
export class ChangePinConfirmPageModule {}
