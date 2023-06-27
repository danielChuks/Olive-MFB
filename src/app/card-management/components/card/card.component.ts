import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { DashboardService } from 'src/app/hometab/dashboard.service';
import { CardService } from '../../card.service';
import { Subscription } from 'rxjs';
import { HotlistModel } from '../../hotlist';
import { AlertController } from '@ionic/angular';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  accountNumber;
  accountNumber2 = '012233443';
  accountType;
  myselectedAccount = '';
  multipleAccounts;
  firstName: any;
  accountName: any;
  listOfCards: any = [];
  istoggleDisabled = false;
  customerNumber;

  hotListDetails = new HotlistModel();

  private httpSubscriptions: Subscription[] = [];

  constructor(
    private dashboardService: DashboardService,
    private actionSheetCtrl: ActionSheetController,
    private cardService: CardService,
    private alertController: AlertController,
    private profileService: ProfileService
  ) {}

  generateCardDetails(accountNumber) {
    //get card details of the primary account number
    this.httpSubscriptions.push(
      this.cardService.getCardDetails(accountNumber).subscribe(
        (data) => {
          this.listOfCards = data.cardsList;
          console.log(this.listOfCards);
        },
        (err) => {
          //console.log(err);
        }
      )
    );
  }

  toggleChange(e) {
    this.hotListDetails.accountNumber = this.myselectedAccount;
    this.hotListDetails.cardPan = this.listOfCards[0].cardPan; //check
    this.hotListDetails.customerNumber = this.customerNumber;
    if (e.detail.checked === true) {
      this.httpSubscriptions.push(
        this.cardService.hotlistCard(this.hotListDetails).subscribe(
          (data) => {
          },
          (err) => {
            this.presentAlert(err.error.message || 'Unable to reach server');
          }
        )
      );
    } else {
    }
  }

  ngOnInit() {
    this.accountNumber = JSON.parse(sessionStorage.getItem('accountNumber'));
    this.generateCardDetails(this.accountNumber); //generate cards details on init
    if (this.listOfCards.length === 0) {
      this.istoggleDisabled = true;
    } else {
      this.istoggleDisabled = false;
    }

    //call account information to get customer number
    this.httpSubscriptions.push(
      this.profileService.getAccountInformation().subscribe(
        (data) => {
          this.customerNumber = data.customerNumber;
          this.accountName = data.accountName;
        },
        (err) => {
          //console.log(err);
        }
      )
    );

    //get all accounts associated with this account number
    this.httpSubscriptions.push(
      this.dashboardService.getMultipleAccounts().subscribe(
        (data) => {
          this.multipleAccounts = data.multipleAccounts;
        },

        (err) => {
          //console.log(err);
        }
      )
    );
  }

  //genrate card details based on account selected
  handleSelectOption(e) {
    this.myselectedAccount = e.target.value;
    this.generateCardDetails(this.myselectedAccount);
  }

  ngOnDestroy() {
    this.httpSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
