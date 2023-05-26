import { Component, OnDestroy, OnInit, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonModal, ModalController } from '@ionic/angular';
import { BeneficiariesService } from 'src/app/manage-beneficiaries/beneficiaries.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-external-beneficiaries',
  templateUrl: './external-beneficiaries.component.html',
  styleUrls: ['./external-beneficiaries.component.scss'],
})
export class ExternalBeneficiariesComponent implements OnInit {

  selectedBeneficiary;
  beneficiaryDetails;
  name: string;
  message: any;
  beneficiariesList: any[] = [];
  filteredBenList: any;
  sendTrue = true;

  private httpSubscription: Subscription;


  constructor(
    private router: Router,
              private modalCtrl: ModalController,
              private beneficiaryService:  BeneficiariesService,
              private actionSheetCtrl: ActionSheetController
  ) { }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  handleSearchInput(event) {
    const query = event.target.value.toLowerCase();
    //console.log(query);
    if (!query) {
      this.filteredBenList = [...this.beneficiariesList]; //if there is nothing entered, display all the list
    }
    else {
      this.filteredBenList = this.beneficiariesList.filter((list) =>
        // eslint-disable-next-line max-len
        list.benAccountName.toLowerCase().includes(query) || list.benAccountNumber.toLowerCase().includes(query) || list.benBankName.toLowerCase().includes(query)
        //filter list based on accountnumber, bankName and customeName
       );
    }
  }

  addBeneficiary(accountNumber, accountName, bankName,  bankCode, sendTrue ) {
    return this.modalCtrl.dismiss({ accountNumber,   accountName,   sendTrue, bankName, bankCode},  'confirm');
    }

    ngOnInit() {
      this.httpSubscription =   this.beneficiaryService.getExternalBeneficiaryList()
      .subscribe(
        data=>{
          this.beneficiariesList = data.beneficiaryList;
          this.filteredBenList = data.beneficiaryList;
          //console.log(this.beneficiariesList);
        },
        err=>{
          //console.log(err);
        }

      );
      }

  ngOnDestroy() {
    if(this.httpSubscription){
      this.httpSubscription.unsubscribe();
    }
    
  }
}
