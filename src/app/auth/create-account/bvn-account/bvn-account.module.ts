import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BvnAccountPageRoutingModule } from './bvn-account-routing.module';

import { BvnAccountPage } from './bvn-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BvnAccountPageRoutingModule
  ],
  declarations: [BvnAccountPage]
})
export class BvnAccountPageModule {}
