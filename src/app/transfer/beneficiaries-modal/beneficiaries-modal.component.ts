import { Component, OnDestroy, OnInit, ViewChild,  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, IonModal, ModalController } from '@ionic/angular';
import { BeneficiariesService } from 'src/app/manage-beneficiaries/beneficiaries.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-beneficiaries-modal',
  templateUrl: './beneficiaries-modal.component.html',
  styleUrls: ['./beneficiaries-modal.component.scss'],
})
export class BeneficiariesModalComponent implements OnInit, OnDestroy {

  @ViewChild(IonModal) modal: IonModal;

  selectedBeneficiary;
  beneficiaryDetails;
  name: string;
  message: any;
  beneficiariesList: any[] = [];
  filteredBenList: any;
  sendTrue = true;
  private httpSubscription: Subscription;

  constructor(private router: Router,
              private modalCtrl: ModalController,
              public beneficiaryService: BeneficiariesService,
              private actionSheetCtrl: ActionSheetController) { }

              cancel() {
                this.modalCtrl.dismiss(null, 'cancel');
              }

      handleSearchInput(event) {
    const query = event.target.value.toLowerCase();
    //console.log(query);
    if (!query) {
      this.filteredBenList = [...this.beneficiaryService.beneficiariesList]; //if there is nothing entered, display all the list
    }
    else {
      this.filteredBenList = this.beneficiaryService.beneficiariesList.filter((list) =>
        // eslint-disable-next-line max-len
        list.benAccountName.toLowerCase().includes(query) || list.benAccountNumber.toLowerCase().includes(query) || list.benBankName.toLowerCase().includes(query)
        //filter list based on accountnumber, bankName and customeName
       );
    }
  }

              addBeneficiary(accountName, accountNumber, sendTrue) {
                return this.modalCtrl.dismiss({accountNumber,  accountName, sendTrue},  'confirm');
                }


              ngOnInit() {
                this.httpSubscription =   this.beneficiaryService.getInternalBeneficiaryList()
                .subscribe(
                  data=>{
                    this.beneficiaryService.beneficiariesList = data.beneficiaryList;
                     this.filteredBenList = data.beneficiaryList;
                     //console.log(this.beneficiaryService.beneficiariesList);
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
