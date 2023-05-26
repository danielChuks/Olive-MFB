import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DashboardService } from 'src/app/hometab/dashboard.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
})
export class TransactionHistoryPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @Input() accountHist: any;

  message = '';
  name: string;
  isAccount = false;
  isFilter = false;
  isSearch = false;
  response: any;
  accountBalance: string;
  accountNumber: string;
  accountName: any;
  firstName: any;

  constructor(
    private modalCtrl: ModalController,
    private dashboardService: DashboardService
  ) {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = '${ev.detail.data}';
    }
  }

  ngOnInit() {
    this.dashboardService.getBalanceEnquiry().subscribe((data) => {
      this.accountBalance = data.return.availableBalance;
      this.accountNumber = data.return.targetAccountNumber;
      this.accountName = data.return.targetAccountName.split(' ');
      if (this.accountName[0] === '') {
        this.firstName = this.accountName[1];
      } else {
        this.firstName = this.accountName[0];
      }
    });
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }
}
