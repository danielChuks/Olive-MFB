import { Component, OnInit } from '@angular/core';
import { BeneficiariesService } from 'src/app/manage-beneficiaries/beneficiaries.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss'],
})
export class BankListComponent implements OnInit {

  mybank;
  search: any;
  banksList: any;
  filteredBankList: any;
  spinner = true;

  constructor(private  beneficiaryService: BeneficiariesService,private modalCtrl: ModalController,
    private alertController: AlertController, ) { }


  confirm(bankName, bankCode){
    return this.modalCtrl.dismiss({bankName, bankCode},  'confirm');
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


  ngOnInit() {
    this.spinner = true;
    this.beneficiaryService.getListofBanks()
.subscribe(
  data=>{
    this.spinner = false;
    this.banksList = data.banks;
    this.filteredBankList = this.banksList;
  },

err=>{
  this.spinner = false;
  this.presentAlert(err.error.message ||  'Unable to reach server');
}

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
