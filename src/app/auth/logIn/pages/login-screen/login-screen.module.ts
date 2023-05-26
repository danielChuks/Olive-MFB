import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { LoginScreenPageRoutingModule } from './login-screen-routing.module';
import { LoginScreenPage } from './login-screen.page';
import { DashboardService } from 'src/app/hometab/dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginScreenPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginScreenPage],
  providers:[DashboardService]
})
export class LoginScreenPageModule {}
