import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AlertController, IonModal, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DashboardService } from 'src/app/hometab/dashboard.service';
import { TransactionModalComponent } from 'src/app/reusableComponents/transaction-modal/transaction-modal.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [DashboardService],
})
export class TransactionsComponent implements OnInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild(IonModal) modal: IonModal;
  @Input() accountHist: any;

  message = '';
  name: string;
  isSearch = false;
  isModalOpen = false;
  response: any;
  multipleAccounts;
  selectedHistory;

  constructor(
    private router: Router,
    public dashboardService: DashboardService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    public http: HttpClient,
    private platform: Platform
  ) {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  ngOnInit() {}

  // formating the date
  formatDate(date: string): string {
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  }
  // eslint-disable-next-line max-len
  async openModal(
    transactionDate,
    transactionType,
    transactionReference,
    transactionAmount,
    sourceAccount,
    beneficiaryName,
    statementBalance,
    beneficiaryAccountNo,
    sourceAccountName
  ) {
    const modal = await this.modalCtrl.create({
      component: TransactionModalComponent,
      backdropBreakpoint: 0.1,
      initialBreakpoint: 600 / this.platform.height(),
      breakpoints: [0, 600 / this.platform.height()],
    });
    modal.present();
    this.selectedHistory = {
      transDate: transactionDate,
      transType: transactionType,
      transRef: transactionReference,
      transAmount: transactionAmount,
      srcAccount: sourceAccount,
      srcAccountName: sourceAccountName,
      benName: beneficiaryName,
      balance: statementBalance,
      benAcctNo: beneficiaryAccountNo,
    };

    sessionStorage.setItem(
      'selectedHistory',
      JSON.stringify(this.selectedHistory)
    );
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }
}
