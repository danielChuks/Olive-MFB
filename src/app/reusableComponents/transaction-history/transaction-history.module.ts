import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'src/app/reusableComponents/cardcomponent/card/card.module';
import { IonicModule } from '@ionic/angular';
import { TransactionHistoryPageRoutingModule } from './transaction-history-routing.module';
import { TransactionHistoryPage } from './transaction-history.page';
import { DashboardService } from 'src/app/hometab/dashboard.service';
import { TransactionModalModule } from 'src/app/reusableComponents/transaction-modal/transaction-modal.component.module';
import { TransactionsModule } from 'src/app/hometab/transactions/transactions.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionHistoryPageRoutingModule,
    CardModule,
    TransactionModalModule,
    TransactionsModule
  ],
  declarations: [TransactionHistoryPage],
  providers:[DashboardService]
})
export class TransactionHistoryPageModule {}
