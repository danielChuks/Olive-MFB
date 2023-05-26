import { Component, OnInit } from '@angular/core';
import { BeneficiariesService } from '../beneficiaries.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { GeneralServiceService } from 'src/app/general-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
   message: string;
  beneficiaryDetails;
  senderAcctNo;
  storedData;
    constructor(private beneficiaryService: BeneficiariesService, private alertController: AlertController,
      private modalCtrl: ModalController,  private generalService: GeneralServiceService, private router: Router,) { }

    ngOnInit() {
      this.senderAcctNo = JSON.parse(sessionStorage.getItem('accountNumber'));
      this.storedData= JSON.parse(sessionStorage.getItem('selectedBeneficiary'));
      this.beneficiaryDetails = { ...this.storedData, senderAcctNo: this.senderAcctNo };
    }


  cancel() {
    //close modal and navigate to transfer based on the beneficiary selected
    if (this.beneficiaryDetails.bankCode === 'local') {
      this.router.navigateByUrl('/transfer');
      this.generalService.updateMessage({
        isTrue : true,
        benNo: this.beneficiaryDetails.beneficiaryAcctNo,
        benName : this.beneficiaryDetails.beneficiaryAcctName});
    }
    else {
      this.router.navigateByUrl('/other-transfer');
      this.generalService.updateExternal({
          isTrue : true,
        benNo: this.beneficiaryDetails.beneficiaryAcctNo,
        benName : this.beneficiaryDetails.beneficiaryAcctName});
    }

 return this.modalCtrl.dismiss(null, 'cancel');
    }


    deleteBeneficiary(){
      //console.log(this.beneficiaryDetails);
    this.beneficiaryService.deleteBeneficiary()
    .subscribe(
      data=>{
        this.presentAlert(data.responseMessage);
      },

      err=>{
        //console.log(err);
      }
    );

       return this.modalCtrl.dismiss(null, 'cancel');
    }


    async presentAlert(msg) {
      const alert = await this.alertController.create({
        message: msg,
        buttons: ['OK'],
      });

      await alert.present();
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
            }
          },
        ],
      });
      await alert.present();
    }
}
