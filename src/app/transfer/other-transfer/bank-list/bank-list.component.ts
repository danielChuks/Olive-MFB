import { Component, OnInit } from '@angular/core';
import { BeneficiariesService } from 'src/app/manage-beneficiaries/beneficiaries.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss'],
})
export class BankListComponent implements OnInit {

  mybank;
  type;
  search: any;
  banksList: any;
  filteredBankList: any;
  spinner = true;

  constructor(private  beneficiaryService: BeneficiariesService,private modalCtrl: ModalController,
    private alertController: AlertController, private loadingCtrl: LoadingController) { }


    confirm(bankName, cbnCode){
      return this.modalCtrl.dismiss({bankName, cbnCode},  'confirm');
    }
    async presentLoading() {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
        cssClass: 'custom-loading',
          backdropDismiss: true,
      });
      await loading.present();

      return loading;
    }

  handleSearchInput(e) {
    const query = e.target.value.toLowerCase();
    if (!query) {
      this.filteredBankList = [...this.banksList];
    }
    else {
      this.filteredBankList = this.banksList.filter((bank) =>
      bank.bankName.toLowerCase().includes(query)  );
    }
  }

  async getInterswitchBankList() {
    // const loading = await this.presentLoading();
    this.spinner = true;
    this.beneficiaryService.getInterswitchBanks().subscribe(
      data => {
        //if component is being called from add beneficiary, spread data and add local bank
        if (this.type) {
    this.mybank = [{id: '00',
     cbnCode: '000',
     bankName: 'NMF mfb',
    bankCode: '000' }, ...data.banks];
     this.banksList = this.mybank;
          this.filteredBankList = this.banksList;
          this.spinner = false;
          // loading.dismiss();
        }
        else {
          console.log(data);
        this.banksList = data.banks;
        this.filteredBankList = this.banksList;
        this.spinner = false;
        //  loading.dismiss();
        }

      },
      err => {
          // loading.dismiss();
          this.spinner = false;
        console.log(err);
        this.presentAlert(err.error.message || 'Service not available');
      }
    );
  }

  async getNipBankList() {
    const loading = await this.presentLoading();
    this.spinner = false;
       this.beneficiaryService.getNipListofBanks()
.subscribe(
 data => {
   if (this.type) {
   this.mybank = [{id: '00',
    cbnCode: '000',
    bankName: 'Olive mfb',
   bankCode: 'local' }, ...data.banks];
    this.banksList = this.mybank;
     this.filteredBankList = this.banksList;
     loading.dismiss();
       }
       else {
         console.log(data);
       this.banksList = data.banks;
       this.filteredBankList = this.banksList;
        loading.dismiss();
       }
 },
err => {
    loading.dismiss();
 this.presentAlert(err.error.message ||  'Service not available');
}
);
 }


  ngOnInit() {
    this.spinner = true;
    this.getInterswitchBankList();
//     this.beneficiaryService.getListofBanks()
// .subscribe(
//   data=>{
//     this.spinner = false;
//     this.banksList = data.banks;
//     this.filteredBankList = this.banksList;
//   },

// err=>{
//   this.spinner = false;
//   this.presentAlert(err.error.message ||  'Unable to reach server');
// }

// );

  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }


}
