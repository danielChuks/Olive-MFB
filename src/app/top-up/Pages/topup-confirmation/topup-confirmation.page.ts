import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { GeneralServiceService } from 'src/app/general-service.service';
import { ModalController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { PinModalComponent } from 'src/app/reusableComponents/pin-modal/pin-modal.component';

@Component({
  selector: 'app-topup-confirmation',
  templateUrl: './topup-confirmation.page.html',
  styleUrls: ['./topup-confirmation.page.scss'],
})
export class TopupConfirmationPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  message = '';
  name: string;
  amount = '';
  accountType = 'Savings Account';
  accountName = '';
  sourceAccountNumber = '';
  beneficiaryBank = '';
  commission = '';
  phoneNo = '';
  totalAmount = '';
  carrier = '';
  category = '';
  product = '';
  confirmationDetails: any;

  private createPasscodeValues: number[] = [];

  constructor(
    private generalService: GeneralServiceService,
    private nativeStorage: NativeStorage,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {}


  ngOnInit() {
    this.generalService.currentAirtimeDetails.subscribe((data) => {
      this.sourceAccountNumber = data.sourceAccountNumber;
      this.phoneNo = data.customerMobile; //mobile number or customer id
      this.amount = data.transactionAmount;
      this.product = 'Mobile Recharge';
      this.carrier = data.mobileOperatorDescription;

      this.confirmationDetails = {
        phoneNo: this.phoneNo,
        carrier: this.carrier,
        amount: this.amount,
        sourceAccountNumber: this.sourceAccountNumber,
      };
    });
  }

  async openPinModal() {
    const modal = await this.modalCtrl.create({
      component: PinModalComponent,
      backdropBreakpoint: 0.1,
      initialBreakpoint: 600 / this.platform.height(),
      breakpoints: [0, 600 / this.platform.height()],
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  editMethod() {
    // this.generalService.updateAirtimeDetails(this.confirmationDetails);
  }

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

  addNumber(num: number): void {
    if (this.createPasscodeValues.length !== 6) {
      this.createPasscodeValues.push(num);
    }
  }

  removeNumber() {
    this.createPasscodeValues.pop();
  }
}
