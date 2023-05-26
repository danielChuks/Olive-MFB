import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FillFormPageRoutingModule } from './fill-form-routing.module';

import { FillFormPage } from './fill-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FillFormPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [FillFormPage],
})
export class FillFormPageModule {}
