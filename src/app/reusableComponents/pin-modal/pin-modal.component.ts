import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { TransferService } from '../../transfer/transfer.service';
import { InternalTransferModel } from '../../transfer/InternalTransferModel';
import { AlertController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BeneficiariesService } from 'src/app/manage-beneficiaries/beneficiaries.service';
import { accessPinModel } from 'src/app/transfer/acessPinModel';
import { PayBillsService } from 'src/app/pay-bills/pay-bills.service';
import { TopUpService } from 'src/app/top-up/top-up.service';
import { GeneralServiceService } from 'src/app/general-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.component.html',
  styleUrls: ['./pin-modal.component.scss'],
})
export class PinModalComponent implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;
  pinValidationDetails = new accessPinModel();
  pinname: any;

  message = '';
  name: string;
  accountType = 'Savings Account';
  beneficiaryBank = 'Amju';
  totalAmount: any;
  confirmationDetails: any;
  sourceAccount: '';
  narration: '';
  destinationAccount: '';
  amount: '';
  beneficiaryName: '';
  beneficiaryDetails;
  passCode;
  convertedPin;
  extTransferDetails;
  currentRoute;
  billsPaymentInfo;
  airtimeDetails;
  externalBenDetails: any;

  private createPasscodeValues: number[] = [];
  private httpSubscriptions: Subscription[] = [];

  constructor(
    private transferService: TransferService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private beneficiaryService: BeneficiariesService,
    private route: Router,
    private payBillsService: PayBillsService,
    private topUpService: TopUpService,
    private generalService: GeneralServiceService,
  ) {}

  ngOnInit() {
    this.confirmationDetails = JSON.parse(
      sessionStorage.getItem('intTransfer')
    );
    this.extTransferDetails = JSON.parse(
      sessionStorage.getItem('externalDetails ')
    );
    this.billsPaymentInfo = JSON.parse(
      sessionStorage.getItem('billsPaymentData')
    );
    this.airtimeDetails = JSON.parse(sessionStorage.getItem('airtimeInfo'));
    // eslint-disable-next-line max-len
    this.httpSubscriptions.push(
      this.generalService.currentBeneficiaryDetails.subscribe((data) => {
        //get details of  beneficary when in external transfers
        this.externalBenDetails = data;
      })
    );
  }

  cancel() {
    this.route.navigateByUrl('/pdf-test');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = '${ev.detail.data}';
    }
  }

  goBack() {
      return this.modalCtrl.dismiss(null, 'cancel');
  }

  //check if user opted to save beneficiary in external transfer page.
  saveExternalBeneficiary() {
    if (this.externalBenDetails) {
      this.httpSubscriptions.push(
        this.beneficiaryService
          .addBeneficiary(this.externalBenDetails)
          .subscribe(
            (data) => {},
            (err) => {}
          )
      );
    }
  }

  saveLocalBeneficiary() {
     this.beneficiaryDetails = JSON.parse(
      sessionStorage.getItem('trnsBeneficiaryDetails')
    );
    if (this.beneficiaryDetails) {
      this.httpSubscriptions.push(
        this.beneficiaryService
          .addBeneficiary(this.beneficiaryDetails)
          .subscribe(
            (data) => {},

            (err) => {}
          )
      );
    }
  }

  async activateTransfer() {
    //loading component/controller
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      cssClass: 'custom-loading',
    });
    loading.present();

    // get and post saved beneficiary details
    // if(on a particular this.route, set details else do the other)


    //post details and allow transfer
    // check for current route
    if (this.router.url === '/external-transfer-activity') {
      this.httpSubscriptions.push(
        this.transferService
          .externalFundTransfer(this.extTransferDetails)
          .subscribe(
            (data) => {
              if (data.return.responseCode === '00') {
                this.saveExternalBeneficiary(); //save beneficary
                this.modalCtrl.dismiss(null, 'cancel');
                this.router.navigateByUrl('/ext-receipt'); //receipt page for external tf
                loading.dismiss();
              }
            },

            (err) => {
              loading.dismiss();
              if (err.error.message) {
                this.presentAlert(err.error.message);
              } else {
                this.presentAlert('An error occurred');
              }
            }
          )
      );
    } else if (this.router.url === '/transfer/full-activity') {
      this.httpSubscriptions.push(
        this.transferService
          .internalFundTransfer(this.confirmationDetails)
          .subscribe(
            (data) => {
              loading.dismiss();
              this.modalCtrl.dismiss(null, 'cancel');
              this.saveLocalBeneficiary();
              this.router.navigateByUrl('/transfer/receipt');
            },

            (err) => {
              //console.log(err);
              loading.dismiss();
              if (err.error.message) {
                this.presentAlert(err.error.message);
              } else {
                this.presentAlert('An error occurred');
              }
            }
          )
      );
    } else if (this.router.url === '/bills-activity') {
      //if response code === success
      this.httpSubscriptions.push(
        this.payBillsService.payBills(this.billsPaymentInfo).subscribe(
          (data) => {
            loading.dismiss();
            this.modalCtrl.dismiss(null, 'cancel');
            this.router.navigateByUrl('/bills-receipt');
          },
          (err) => {
            //remain on the same page incase of an error and display the error message
            loading.dismiss();
            if (err.error.message) {
              this.presentAlert(err.error.message);
            } else {
              this.presentAlert('An error occurred');
            }
          }
        )
      );
    } else if (this.router.url === '/top-up/topup-confirmation') {
      this.httpSubscriptions.push(
        this.topUpService.buyAirtime(this.airtimeDetails).subscribe(
          (data) => {
            loading.dismiss();
            this.modalCtrl.dismiss(null, 'cancel');
            this.router.navigateByUrl('/top-up/success');
          },
          (err) => {
            loading.dismiss();
            if (err.error.message) {
              this.presentAlert(err.error.message);
            } else {
              this.presentAlert('An error occurred');
            }
          }
        )
      );
    }
  }

  addNumber(num: number): void {
    if (this.createPasscodeValues.length !== 4) {
      this.createPasscodeValues.push(num);
      for (let i = 0; i < this.createPasscodeValues.length; i++) {
        document.getElementById(`circles${i}`).classList.add('test');
      }
      if (this.createPasscodeValues.length === 4) {
        this.convertedPin = this.createPasscodeValues.toString(); // convert array values to string
        this.pinValidationDetails.accessPin = this.convertedPin.replace(/,/g, '');
        //initialize pin to pin object
        this.pinValidationDetails.accountNumber = sessionStorage.getItem('accountNumber');
        //initialize account number
        console.log(this.pinValidationDetails);
        this.httpSubscriptions.push(
          this.transferService.validatePin(this.pinValidationDetails).subscribe(
            (data) => {
              this.activateTransfer();
            },
            (err) => {
              if (err.error.message) {
                this.presentAlert(err.error.message);
              } else {
                this.presentAlert('An error occurred');
              }
            }
          )
        );
      }
    }
  }

  removeNumber() {
    this.createPasscodeValues.pop();
    for (let i = this.createPasscodeValues.length; i >= 0; i++) {
      document.getElementById(`circles${i}`).classList.remove('test');
      break;
    }
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  nextField(nextInput, num: number) {
    this.createPasscodeValues.push(num);
    nextInput.setFocus();
  }

  async finishFunction() {}

  ngOnDestroy() {
    this.httpSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }
}
