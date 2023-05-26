import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TransferPageRoutingModule } from './transfer-routing.module';
import { TransferPage } from './transfer.page';
import { TransferService } from './transfer.service';
import { DashboardService } from '../hometab/dashboard.service';
import { BeneficiariesModalModule } from './beneficiaries-modal/beneficiaries-modal.module';
import { BeneficiariesService } from '../manage-beneficiaries/beneficiaries.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TransferPageRoutingModule,
    BeneficiariesModalModule
  ],
  declarations: [TransferPage],
  providers:[TransferService, DashboardService, BeneficiariesService, CurrencyPipe ]

})
export class TransferPageModule {}
