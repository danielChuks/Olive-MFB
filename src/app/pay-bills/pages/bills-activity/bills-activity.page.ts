import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PinModalComponent } from 'src/app/reusableComponents/pin-modal/pin-modal.component';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-bills-activity',
  templateUrl: './bills-activity.page.html',
  styleUrls: ['./bills-activity.page.scss'],
})
export class BillsActivityPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message = '';
  name: string;
  segmentModel = '1';
  amount;
  accountNumber;
  accountType = 'Savings Account';
  category;
  product;
  transferInfo;
  recipient;
  savedDetails;
  customerId;
  requiredField;

  private createPasscodeValues: number[] = [];

  constructor(
    private router: Router,
    private nativeStorage: NativeStorage,
    private modalCtrl: ModalController,
    private platform: Platform
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

  async openPinModal() {
    const modal = await this.modalCtrl.create({
      component: PinModalComponent,
      cssClass: 'full-page-modal',
      backdropDismiss: false,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  retrieveTransferInfo() {
    this.savedDetails = JSON.parse(sessionStorage.getItem('transferInfo'));
    this.accountNumber = this.savedDetails.sourceAccountNumber;
    this.recipient = this.savedDetails.billerName;
    this.category = this.savedDetails.nameOfCategory;
    this.product = this.savedDetails.transactionDescription;
    this.amount = this.savedDetails.transactionAmount;
    this.customerId = this.savedDetails.customerId;
    this.requiredField = this.savedDetails.requiredField;
  }

  ngOnInit() {
    this.retrieveTransferInfo();
  }
}
