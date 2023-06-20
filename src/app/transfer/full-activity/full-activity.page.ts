import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { TransferService } from '../transfer.service';
import { InternalTransferModel } from '../InternalTransferModel';
import { AlertController } from '@ionic/angular';
import { Router,  } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BeneficiariesService } from 'src/app/manage-beneficiaries/beneficiaries.service';
import { accessPinModel } from '../acessPinModel';
import { PinModalComponent } from 'src/app/reusableComponents/pin-modal/pin-modal.component';
import { PinService } from 'src/app/reusableComponents/pin-modal/pin.service';


@Component({
  selector: 'app-full-activity',
  templateUrl: './full-activity.page.html',
  styleUrls: ['./full-activity.page.scss'],
})
export class FullActivityPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  public data = ['UBA', 'UBA', 'UBA', 'UBA', 'UBA', 'UBA', 'UBA'];
  public results = [...this.data];


message = '';
name: string;
segmentModel = '1';
accountType = 'Savings Account';
beneficiaryBank = 'NMFB';
commission = 10.75;
totalAmount: any;
confirmationDetails: any;
sourceAccount: '';
narration: '';
destinationAccount: '';
amount: '';
beneficiaryName: '';
beneficiaryDetails;
convertedPin;
pinValidationDetails = new accessPinModel();





transferModel = new InternalTransferModel();



  private createPasscodeValues: number[] = [];

  constructor(
    private transferService:
     TransferService, private router: Router,
    private alertController: AlertController,
     private loadingCtrl: LoadingController,
     private beneficiaryService: BeneficiariesService,
     private modalCtrl: ModalController,
     private pinservice: PinService,
     private platform: Platform) { }

     async openPinModal() {
      const modal = await this.modalCtrl.create({
        component: PinModalComponent,
        cssClass: 'full-page-modal',
        backdropDismiss: false,
      });
      modal.present();
      const { data, role } = await modal.onWillDismiss();

    }


  ngOnInit() {
    this.confirmationDetails = JSON.parse(sessionStorage.getItem('intTransfer'));
    //console.log(this.confirmationDetails);
    const {sourceAccountNumber, narration, beneficiaryAccountNumber, transactionAmount, name} =  this.confirmationDetails;
    //console.log(this.confirmationDetails);
    this.sourceAccount = sourceAccountNumber;
    this.narration = narration;
    this.destinationAccount = beneficiaryAccountNumber;
    this.amount = transactionAmount;
    this.beneficiaryName = name;
    // eslint-disable-next-line radix
    // this.totalAmount = parseInt(transactionAmount) + this.commission;
    //console.log(this.router.url);

      }



  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.pinservice.transfer();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = '${ev.detail.data}';
    }
  }

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter(d => d.toLowerCase().indexOf(query) > -1);
  }

  segmentChanged(event){
    //console.log(this.segmentModel);
    //console.log(event);
  }



  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
