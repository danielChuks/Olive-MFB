import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountOptionsPageRoutingModule } from './account-options-routing.module';

import { AccountOptionsPage } from './account-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountOptionsPageRoutingModule
  ],
  declarations: [AccountOptionsPage]
})
export class AccountOptionsPageModule {}
