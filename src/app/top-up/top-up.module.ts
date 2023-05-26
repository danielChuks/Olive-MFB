import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TopUpPageRoutingModule } from './top-up-routing.module';
import { TopUpPage } from './top-up.page';
import { DashboardService } from '../hometab/dashboard.service';
import { CarrierModule } from './Pages/carrier/carrier.module';
import { BundleModule } from './Pages/bundle/bundle.module';
import { TopUpService } from './top-up.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TopUpPageRoutingModule,
    CarrierModule,
    BundleModule
  ],
  declarations: [TopUpPage],
  providers:[DashboardService, TopUpService,  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, ]

})
export class TopUpPageModule {}
