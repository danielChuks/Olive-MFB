import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { TransferService } from '../transfer.service';
import { ExternalTransferModel } from '../ExternalTransferModel';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BeneficiariesService } from 'src/app/manage-beneficiaries/beneficiaries.service';
import { accessPinModel } from '../acessPinModel';
import { PinModalComponent } from 'src/app/reusableComponents/pin-modal/pin-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-external-transfer-activity',
  templateUrl: './external-transfer-activity.page.html',
  styleUrls: ['./external-transfer-activity.page.scss'],
})
export class ExternalTransferActivityPage implements OnInit {
  extTransferModel = new ExternalTransferModel();

  segmentModel = '1';
  accountType = 'Savings Account';
  extTransferDetails;
  extTransferName;
  sourceAccount;
  sourceAccountName;
  benAccountName;
  destinationAccount;
  amount;
  narration;
  bankName;
  totalAmount;
  private createPasscodeValues: number[] = [];

  constructor(
    private transferService: TransferService,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private beneficiaryService: BeneficiariesService,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.extTransferDetails = JSON.parse(
      sessionStorage.getItem('extTransferDetails')
    );
    this.extTransferName = JSON.parse(
      sessionStorage.getItem('externalDetails')
    );
    const {
      sourceAccountNumber,
      sourceAccountName,
      beneficiaryAccountNumber,
      narration,
      transactionAmount,
      name,
      bankName,
      beneficiaryName,
      beneficiaryBankID,
    } = this.extTransferDetails;

    const { senderLastName, senderOtherName } = this.extTransferName;
    //console.log(this.extTransferDetails);
    this.sourceAccount = sourceAccountNumber;
    this.sourceAccountName = `${senderLastName} ${senderOtherName}`;
    this.benAccountName = beneficiaryName;
    this.destinationAccount = beneficiaryAccountNumber;
    this.amount = transactionAmount;
    this.narration = narration;
    this.bankName = bankName;
    // eslint-disable-next-line radix
    this.totalAmount = parseInt(transactionAmount);
  }

  async openPinModal() {
    const modal = await this.modalCtrl.create({
      component: PinModalComponent,
      cssClass: 'full-page-modal',
      backdropDismiss: false,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  async activateTransfer() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      cssClass: 'custom-loading',
    });
    loading.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
