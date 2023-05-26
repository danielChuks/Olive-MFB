import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksModalComponent } from './banks-modal.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [BanksModalComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports:[BanksModalComponent]
})
export class BanksModalModule { }
