import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManageBeneficiariesPageRoutingModule } from './manage-beneficiaries-routing.module';
import { ManageBeneficiariesPage } from './manage-beneficiaries.page';
import { BeneficiariesService } from './beneficiaries.service';
import { AuthInterceptor } from '../auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageBeneficiariesPageRoutingModule,
  ],
  declarations: [ManageBeneficiariesPage],
  providers:[BeneficiariesService,  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },]
})
export class ManageBeneficiariesPageModule {}
