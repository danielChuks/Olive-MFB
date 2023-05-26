import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankListComponent } from './bank-list.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [BankListComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports:[BankListComponent]
})
export class BankListModule { }
