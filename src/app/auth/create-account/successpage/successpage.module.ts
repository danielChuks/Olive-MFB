import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccesspagePageRoutingModule } from './successpage-routing.module';

import { SuccesspagePage } from './successpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccesspagePageRoutingModule
  ],
  declarations: [SuccesspagePage]
})
export class SuccesspagePageModule {}
