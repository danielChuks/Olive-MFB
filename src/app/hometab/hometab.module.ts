import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HometabPageRoutingModule } from './hometab-routing.module';
import { HometabPage } from './hometab.page';
import { CardModule } from '../reusableComponents/cardcomponent/card/card.module';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DashboardService } from './dashboard.service';
import { TransactionModalModule } from '../reusableComponents/transaction-modal/transaction-modal.component.module';
// import { TransactionsModule } from '../reusableComponents/transactions/transactions.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthInterceptor } from '../auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    HometabPageRoutingModule,
    CardModule,
    TransactionModalModule,
    TransactionsModule,
  ],
  declarations: [HometabPage],
  providers:[DashboardService,  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },]
})
export class HometabPageModule {}
