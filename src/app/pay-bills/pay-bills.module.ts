import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayBillsPageRoutingModule } from './pay-bills-routing.module';
import { PayBillsPage } from './pay-bills.page';
import { DashboardService } from '../hometab/dashboard.service';
import { PayBillsService } from './pay-bills.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PayBillsPageRoutingModule,
  ],
  declarations: [PayBillsPage],
  providers:[DashboardService, PayBillsService,  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },]
})
export class PayBillsPageModule {}
