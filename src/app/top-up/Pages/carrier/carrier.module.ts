/* eslint-disable @typescript-eslint/naming-convention */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CarrierComponent } from './carrier.component';
import { TopUpService } from '../../top-up.service';

@NgModule({
  declarations: [CarrierComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [CarrierComponent],
  providers:[TopUpService ]

})
export class CarrierModule { }
