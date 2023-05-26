import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BeneficiariesService } from '../beneficiaries.service';
import { AddBeneficiariesPageRoutingModule } from './add-beneficiaries-routing.module';
import { AddBeneficiariesPage } from './add-beneficiaries.page';
import { DashboardService } from 'src/app/hometab/dashboard.service';
import { ManageBeneficiariesPage } from '../manage-beneficiaries.page';
import { BanksModalModule } from './banks-modal/banks-modal.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBeneficiariesPageRoutingModule,
    ReactiveFormsModule,
    BanksModalModule
  ],
  declarations: [AddBeneficiariesPage],
  providers:[BeneficiariesService, DashboardService, ManageBeneficiariesPage]
})
export class AddBeneficiariesPageModule {}
