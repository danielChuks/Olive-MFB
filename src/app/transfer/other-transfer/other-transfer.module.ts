import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OtherTransferPageRoutingModule } from './other-transfer-routing.module';
import { OtherTransferPage } from './other-transfer.page';
import { DashboardService } from 'src/app/hometab/dashboard.service';
import { BeneficiariesService } from 'src/app/manage-beneficiaries/beneficiaries.service';
import { BankListModule } from './bank-list/bank-list.module';
import { TransferService } from '../transfer.service';
import { ExternalBeneficiariesModule } from '../external-beneficiaries/external-beneficiaries.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherTransferPageRoutingModule,
    BankListModule,
    ReactiveFormsModule,
    ExternalBeneficiariesModule
  ],
  declarations: [OtherTransferPage],
  providers:[ DashboardService, BeneficiariesService, TransferService]

})
export class OtherTransferPageModule {}
