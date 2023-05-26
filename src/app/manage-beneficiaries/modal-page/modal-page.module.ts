import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalPagePageRoutingModule } from './modal-page-routing.module';
import { ModalPagePage } from './modal-page.page';
import { BeneficiariesService } from '../beneficiaries.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPagePageRoutingModule,
    HttpClientModule
  ],
  declarations: [ModalPagePage],
  providers:[BeneficiariesService]

})
export class ModalPagePageModule {}
