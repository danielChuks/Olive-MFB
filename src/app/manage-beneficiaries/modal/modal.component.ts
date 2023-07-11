import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BeneficiariesService } from '../beneficiaries.service';
import { ManageBeneficiariesPageModule } from '../manage-beneficiaries.module';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { GeneralServiceService } from 'src/app/general-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [BeneficiariesService],
  // imports: [ManageBeneficiariesPageModule],
})
export class ModalComponent implements OnInit {
  beneficiaryDetails;
  senderAcctNo;
  storedData;
  private httpSubscription: Subscription;

  constructor(private beneficiaryService: BeneficiariesService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private generalService: GeneralServiceService,
    private router: Router) {}

  ngOnInit() {
    this.senderAcctNo = JSON.parse(sessionStorage.getItem('accountNumber'));
    this.storedData = JSON.parse(sessionStorage.getItem('selectedBeneficiary'));
    this.beneficiaryDetails = {
      ...this.storedData,
      senderAcctNo: this.senderAcctNo,
    };
    //console.log(this.beneficiaryDetails);
  }

  cancel() {
    //close modal and navigate to transfer based on the beneficiary selected
    if (this.beneficiaryDetails.bankCode === 'local') {
      this.router.navigateByUrl('/transfer');
      this.generalService.updateMessage({
        isTrue: true,
        benNo: this.beneficiaryDetails.beneficiaryAcctNo,
        benName: this.beneficiaryDetails.beneficiaryAcctName,
      });
    } else {
      this.router.navigateByUrl('/other-transfer');
      this.generalService.updateExternal({
        isTrue: true,
        benNo: this.beneficiaryDetails.beneficiaryAcctNo,
        benName: this.beneficiaryDetails.beneficiaryAcctName,
      });
    }

    return this.modalCtrl.dismiss(null, 'cancel');
  }

  deleteBeneficiary() {
    //console.log(this.beneficiaryDetails);
    this.beneficiaryService.deleteBeneficiary().subscribe(
      (data) => {
      },

      (err) => {
        //console.log(err);
      }
    );

    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async deleteAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      cssClass: 'custom-alert',
      mode: 'ios',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.deleteBeneficiary();
          },
        },
      ],
    });
    await alert.present();
  }
}
