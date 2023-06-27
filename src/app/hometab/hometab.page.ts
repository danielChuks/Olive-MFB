/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { AlertController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { GeneralServiceService } from '../general-service.service';
import { IonModal, Platform } from '@ionic/angular';
import { FilterComponent } from './filter/filter.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-hometab',
  templateUrl: './hometab.page.html',
  styleUrls: ['./hometab.page.scss'],
})
export class HometabPage implements OnInit, OnDestroy {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  @ViewChild('slides', { static: true }) slides: IonSlides;
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  // eslint-disable-next-line @typescript-eslint/type-annotation-spacing
  initials: any;
  response: any;
  accountBalance: string;
  accountNumber: string;
  accountName: any;
  firstName: any;
  accountHistory: any[] = [];
  multipleAccounts;
  currentIndex;
  currentAcctNumber;
  isSearch: boolean = true;
  extend = false;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  isView: boolean = false;
  filteredAccountHistory;
  private httpSubscriptions: Subscription[] = [];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    private router: Router,
    private dashboardService: DashboardService,
    private alertController: AlertController,
    private http: HttpClient,
    private generalService: GeneralServiceService
  ) {}

  async openfilterModal() {
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
      backdropBreakpoint: 0.1,
      initialBreakpoint: 500 / this.platform.height(),
      breakpoints: [0, 500 / this.platform.height()],
    });
    modal.present();
  }

  ViewMore() {
    this.isView = true; // Set the flag to true when "View More" is clicked
  }

  backHome() {
    this.isView = false;
    this.filteredAccountHistory = this.accountHistory;
  }

  //close modal
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  //handle Search Functionality for Transaction History
  handleSearchInput(e) {
    const query = e.target.value.toLowerCase();
    if (!query) {
      this.filteredAccountHistory = this.accountHistory; //if there is nothing entered, display all the list
    } else {
      // eslint-disable-next-line max-len
      this.filteredAccountHistory = this.accountHistory.filter(
        (hist) =>
          hist.transactionAmount.toLowerCase().includes(query) ||
          hist.transactionType.toLowerCase().includes(query)
      );
    }
  }

  // get index of card and use the index to pick account number from the list.
  swiperSlideChanged(event: any) {
      this.currentIndex = this.swiperRef?.nativeElement.swiper.activeIndex; //use index in transaction History page
      this.currentAcctNumber =
      this.multipleAccounts[this.currentIndex].accountNumber;
      sessionStorage.setItem('currentAcctNumber', this.currentAcctNumber);
      this.getHistory();
  }

  getHistory = () => {
    this.httpSubscriptions.push(
      this.dashboardService.getTransactionHistory().subscribe(
        (data) => {
          this.accountHistory = data.accountHistory;
          this.filteredAccountHistory = data.accountHistory;
        },

        (err) => {}
      )
    );
  };

  getHistoryOnInit() {
    this.httpSubscriptions.push(
      this.dashboardService.getTransactionHistoryOnInit().subscribe(
        (data) => {
          this.accountHistory = data.accountHistory;
          this.filteredAccountHistory = data.accountHistory;
        },
        (err) => {}
      )
    );
  }

  ngOnInit() {
    const savedAccountNumber = sessionStorage.getItem('accountNumber');
    //call name enquiry to get initials

    this.httpSubscriptions.push(
      this.dashboardService.getName(savedAccountNumber).subscribe(
        (data) => {
          this.accountName = data.accountName.split(' ');

          this.generalService.updateName(this.accountName); //store customer Name);

          if (this.accountName[0] === '') {
            this.firstName = this.accountName[1];
          } else {
            this.firstName = this.accountName[0];
          }
        },
        (err) => {
          //if name enqury is down, get name from multiple account endpoint
          //console.log(err);
          if (this.multipleAccounts.length > 0) {
            if (this.multipleAccounts[0].accountName.split(' ')[0] === '') {
              this.firstName =
                this.multipleAccounts[0].accountName.split(' ')[1];
            } else {
              this.firstName =
                this.multipleAccounts[0].accountName.split(' ')[0];
            }
          }
        }
      )
    );

    this.getHistoryOnInit(); //first time the page loads, call the history with the account number saved while logging in.

    this.httpSubscriptions.push(
      this.dashboardService.getMultipleAccounts().subscribe(
        (data) => {
          this.multipleAccounts = data.multipleAccounts;
        },

        (err) => {}
      )
    );
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  ngOnDestroy() {
    this.httpSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

  refreshPage(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  handleRefresh(event) {
    this.refreshPage(event);
  }
}
