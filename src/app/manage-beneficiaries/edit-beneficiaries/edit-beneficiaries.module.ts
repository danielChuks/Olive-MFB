import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBeneficiariesPageRoutingModule } from './edit-beneficiaries-routing.module';

import { EditBeneficiariesPage } from './edit-beneficiaries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBeneficiariesPageRoutingModule
  ],
  declarations: [EditBeneficiariesPage]
})
export class EditBeneficiariesPageModule {}
