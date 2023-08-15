import { Component, OnInit } from '@angular/core';
import { BeneficiariesService } from '../../beneficiaries.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-banks-modal',
  templateUrl: './banks-modal.component.html',
  styleUrls: ['./banks-modal.component.scss'],
})
export class BanksModalComponent implements OnInit {
  mybank;
  banksList;
  filteredBankList: any;

  constructor(
    private beneficiaryService: BeneficiariesService,
    private modalCtrl: ModalController,
    private alertController: AlertController,  private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.getListOfBanks();
  }

  confirm(bankName, bankCode) {
    return this.modalCtrl.dismiss({ bankName, bankCode }, 'confirm');
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
    } else {
      this.filteredBankList = this.banksList.filter((bank) =>
        bank.bankName.toLowerCase().includes(query)
      );
    }
  }

  async getListOfBanks(){
    const loading = await this.presentLoading();
    this.beneficiaryService.getListofBanks().subscribe((data) => {
      loading.dismiss();
      this.mybank = [
        { id: '00', cbnCode: '000', bankName: 'Olive MFB', bankCode: 'local' },
        ...data.banks,
      ];
      this.banksList = this.mybank;
      this.filteredBankList = this.banksList;
      // console.log(this.mybank);
    },
    error => {
      loading.dismiss();
    console.log(error);
    this.presentAlert(error.error.message || 'Unable to reach server');
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
