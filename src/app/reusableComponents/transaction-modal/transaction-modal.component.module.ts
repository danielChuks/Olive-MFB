import { CommonModule } from '@angular/common';
import { NgModule,  } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TransactionModalComponent } from './transaction-modal.component';
import { TransactionsModule } from 'src/app/hometab/transactions/transactions.module';
import { TransactionsComponent } from 'src/app/hometab/transactions/transactions.component';


@NgModule ({
    imports: [CommonModule, IonicModule, TransactionsModule,],
    exports: [TransactionModalComponent],
    declarations: [TransactionModalComponent]
  })

  export class TransactionModalModule {}
