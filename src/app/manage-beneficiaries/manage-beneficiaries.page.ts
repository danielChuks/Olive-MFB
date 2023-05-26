/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonModal, Platform } from '@ionic/angular';
import { BeneficiariesService } from './beneficiaries.service';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from './modal-page/modal-page.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-beneficiaries',
  templateUrl: './manage-beneficiaries.page.html',
  styleUrls: ['./manage-beneficiaries.page.scss'],
})
export class ManageBeneficiariesPage implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;

  filteredBenList: any;
  selectedBeneficiary;
  private httpSubscriptions: Subscription[] = [];

  constructor(
    public beneficiaryService: BeneficiariesService,
    private modalCtrl: ModalController,
    private platform: Platform
  ) {}

  async openModal(
    accountName,
    accountNumber,
    benbankName,
    beneficiaryId,
    benBankCode
  ) {
    const modal = await this.modalCtrl.create({
      component: ModalPagePage,
      backdropBreakpoint: 0.1,
      initialBreakpoint: 600 / this.platform.height(),
      breakpoints: [0, 600 / this.platform.height()],
    });
    modal.present();

    this.selectedBeneficiary = {
      //pass as prop instead of sessionstorage
      beneficiaryAcctNo: accountNumber,
      beneficiaryAcctName: accountName,
      bankName: benbankName,
      benID: beneficiaryId,
      bankCode: benBankCode,
    };

    sessionStorage.setItem(
      'selectedBeneficiary',
      JSON.stringify(this.selectedBeneficiary)
    );
    sessionStorage.setItem(
      'beneficiaryId',
      JSON.stringify(this.selectedBeneficiary.benID)
    );

    const { data, role } = await modal.onWillDismiss();
  }

  handleSearchInput(event) {
    const query = event.target.value.toLowerCase();
    if (!query) {
      this.filteredBenList = [...this.beneficiaryService.beneficiariesList]; //if there is nothing entered, display all the list
    } else {
      this.filteredBenList = this.beneficiaryService.beneficiariesList.filter(
        (list) =>
          // eslint-disable-next-line max-len
          list.benAccountName.toLowerCase().includes(query) ||
          list.benAccountNumber.toLowerCase().includes(query) ||
          list.benBankName.toLowerCase().includes(query)
        //filter list based on accountnumber, bankName and customeName
      );
    }
  }

  ngOnInit() {
    this.httpSubscriptions.push(
      this.beneficiaryService.getBeneficiaryList().subscribe(
        (data) => {
          this.beneficiaryService.beneficiariesList = data.beneficiaryList;
          this.filteredBenList = data.beneficiaryList;
        },

        (err) => {}
      )
    );
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.httpSubscriptions.push(
        this.beneficiaryService.getBeneficiaryList().subscribe(
          (data) => {
            this.beneficiaryService.beneficiariesList = data.beneficiaryList;
            this.filteredBenList = data.beneficiaryList;
          },
          (err) => {}
        )
      );
      event.target.complete();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.httpSubscriptions.length > 0) {
      this.httpSubscriptions.forEach((subscription) =>
        subscription.unsubscribe()
      );
    }
  }
}
