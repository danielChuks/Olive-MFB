import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TransactionsComponent } from './transactions.component';
import { DashboardService } from 'src/app/hometab/dashboard.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, IonicModule, HttpClientModule],
  declarations: [TransactionsComponent],
  exports: [TransactionsComponent],
  providers: [DashboardService],
})
export class TransactionsModule {}
