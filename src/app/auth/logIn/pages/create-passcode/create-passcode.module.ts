import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePasscodePageRoutingModule } from './create-passcode-routing.module';

import { CreatePasscodePage } from './create-passcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePasscodePageRoutingModule
  ],
  declarations: [CreatePasscodePage]
})
export class CreatePasscodePageModule {}
