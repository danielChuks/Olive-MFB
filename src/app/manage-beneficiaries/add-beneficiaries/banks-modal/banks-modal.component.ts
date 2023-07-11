import { Component, OnInit } from '@angular/core';
import { BeneficiariesService } from '../../beneficiaries.service';
import { ModalController } from '@ionic/angular';

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
    private modalCtrl: ModalController
  ) {}

  confirm(bankName, bankCode) {
    return this.modalCtrl.dismiss({ bankName, bankCode }, 'confirm');
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

  ngOnInit() {
    this.beneficiaryService.getListofBanks().subscribe((data) => {
      this.mybank = [
        { id: '00', cbnCode: '000', bankName: 'Olive MFB', bankCode: 'local' },
        ...data.banks,
      ];
      this.banksList = this.mybank;
      this.filteredBankList = this.banksList;
      // console.log(this.mybank);
    });
  }
}
