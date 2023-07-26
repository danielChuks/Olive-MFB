import { Component, OnInit, OnDestroy, ViewChild, ElementRef,  } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { RouterOutlet, Router } from '@angular/router';
import { InternalTransferModel } from './InternalTransferModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../hometab/dashboard.service';
import { TransferService } from './transfer.service';
import { BeneficiariesModalComponent } from './beneficiaries-modal/beneficiaries-modal.component';
import { ModalController } from '@ionic/angular';
import { GeneralServiceService } from '../general-service.service';
import { FormRetrievalService } from 'src/app/hometab/formRetrieval.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage implements OnInit, OnDestroy {


  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  limit = '';
  isValid = true;
  isAccount = false;
  beneficiaryAccountName = '';
  accountNumber = 'Select Account';
  accountName = '';
  name: string;
  banks: string[] = ['Access Bank', 'Fidelity Bank', 'First Bank', 'GT Bank'];
  results = [...this.banks];
  transfer = 'Transfer From';
  selectedAccount = '';
  transferTo = '';
  text: '';
  tranferDetails;
  storedAccountNumber;
  myselectedAccount = '';
  multipleAccounts;
  selectedBeneficiary;
  beneficiaryDetails;
  storeState = false;
  isAccountSelected = false;
  benAcctNo = '';
  //checker for account Selected and Account Number
  intTransForm: FormGroup;
  intTransfer = new InternalTransferModel();
  demoObject = new InternalTransferModel();

  isFirstEnter = true;
  benAmount;
  benNarration;

  private httpSubscriptions: Subscription[] = [];


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private transferService: TransferService,
    private modalCtrl: ModalController,
    private generalService: GeneralServiceService,
    private formRetrieval: FormRetrievalService,
  )
  {
    this.intTransForm = this.formBuilder.group({
      beneficiaryAcctNum: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      narration: ['', []],
    });

  }



  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  beneficiary() {
    this.modal.dismiss(this.name, 'confirm');
    this.selectedAccount = this.accountNumber;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.banks.filter(
      (d) => d.toLowerCase().indexOf(query) > -1
    );
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: BeneficiariesModalComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.intTransForm.get('beneficiaryAcctNum').setValue(data.accountNumber);
      this.beneficiaryAccountName = data.accountName;
      this.isAccountSelected = data.sendTrue;
    }
  }

  selectAccountNumber(acctno) {
    this.isAccountSelected = true;
    this.accountNumber = acctno;
    this.selectedAccount = acctno; //pass selected account to next page
    sessionStorage.setItem('selectedAcct', this.selectedAccount);

    if (this.selectedAccount !== this.text) {
      this.beneficiaryAccountName = this.beneficiaryAccountName; // display beneficiaryAccountName from selectedBeneficiary
    } else if (!this.text) {
      this.isAccountSelected = false;
      this.beneficiaryAccountName = 'Please enter account number';
    } else {
      this.httpSubscriptions.push(this.dashboardService.getName(this.text).subscribe(
        (data) => {
          this.beneficiaryAccountName = data.accountName;
          this.isAccountSelected = true;
        },
        (err) => {
          this.selectedAccount = this.selectedBeneficiary;
          this.beneficiaryAccountName = 'Invalid Account Number';
          this.isAccountSelected = false; //check if account number is valid
        }
      ));
    }
    this.httpSubscriptions.push(this.transferService.getTransactionLimit().subscribe(
      (data) => {
        this.limit = data.remainingTransactionAmount;
      }
    ));
  }

  getNameEnquiry(event) {
    this.selectedBeneficiary = JSON.parse(
      sessionStorage.getItem('selectedBeneficiary')
    );
    this.text = event.target.value;
    if (this.text.length === 10) {
      if (this.selectedAccount === this.text) {
        this.isAccountSelected = false;
        this.beneficiaryAccountName ='You cannot transfer funds to this account';
      }
      if (this.selectedAccount !== this.text) {
        this.httpSubscriptions.push(this.dashboardService.getName(event.target.value).subscribe(
          (data) => {
            this.beneficiaryAccountName = data.accountName;
            this.isAccountSelected = true;
          },
          (err) => {
            this.beneficiaryAccountName = 'Invalid Account Number';
            this.isAccountSelected = false; //check if account number is valid
          }
        ));
      }
    } else {
      this.beneficiaryAccountName = 'Account number must be 10 digits';
      this.isAccountSelected = false; //check if accountNumber is valid
    }
  }

  toggleChange(event) {
    this.intTransfer.beneficiaryAcctNo =
      this.intTransForm.value.beneficiaryAcctNum;
    this.beneficiaryDetails = {
      ...this.intTransfer,
      senderAcctNo: this.selectedAccount,
      beneficiaryAcctName: this.beneficiaryAccountName,
      bankName: 'Olive MFB',
      bankCode: 'local',
    };

    if (event.detail.checked === true) {
      sessionStorage.setItem(
        'trnsBeneficiaryDetails',
        JSON.stringify(this.beneficiaryDetails)
      );
      console.log(this.beneficiaryDetails);
    } else {
      sessionStorage.removeItem('trnsBeneficiaryDetails');
    }
  }

  formatInput(inputValue: string) {
    const formattedValue = inputValue.replace(/,/g, '').replace(/[^\d\.]/g, ''); // remove all commas and non-numeric characters
    const parts = formattedValue.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';
    const integerDisplayValue = integerPart.replace(/\d(?=(\d{3})+$)/g, '$&,'); // add commas to integer part
    const displayValue = decimalPart ? integerDisplayValue + '.' + decimalPart : integerDisplayValue; // add decimal part if present
    this.intTransForm.get('amount').setValue(displayValue); // update the form control value
    }


  internalTransfer(formGroup: FormGroup) {
    this.intTransfer.sourceAccountNumber = this.accountNumber;
    this.intTransfer.transactionAmount = formGroup.value.amount;
    this.intTransfer.transactionAmount = formGroup.value.amount.replaceAll(',', '');
    this.intTransfer.narration = formGroup.value.narration;
    this.tranferDetails = {
      ...this.intTransfer,
      name: this.beneficiaryAccountName,
      sourceAccountNumber: this.selectedAccount,
      beneficiaryAccountNumber: formGroup.value.beneficiaryAcctNum,
    };
    sessionStorage.setItem('intTransfer', JSON.stringify(this.tranferDetails));

    this.formRetrieval.saveInternalFormData(
      this.intTransfer.sourceAccountNumber,
      this.intTransfer.beneficiaryAccountNumber,
      this.intTransfer.narration,
      this.intTransfer.transactionAmount,
      this.intTransfer.beneficiaryAccountNumber
    );
    this.router.navigateByUrl('/transfer/full-activity');
  }

  ngOnInit() {
    this.httpSubscriptions.push(this.generalService.currentMessage.subscribe((msg) => {
      //get beneficiary details from beneficiaries page
      this.isAccountSelected = msg.isTrue;
      this.intTransForm.get('beneficiaryAcctNum').setValue( msg.benNo);
      this.beneficiaryAccountName = msg.benName;
    }));
    this.accountNumber = 'Select Account';
    this.storedAccountNumber = sessionStorage.getItem('accountNumber');
    this.httpSubscriptions.push(this.dashboardService.getMultipleAccounts().subscribe(
      (data) => {
        this.multipleAccounts = data;
      },

      (err) => {
      }
    ));
  }

  ionViewWillEnter() {
    if (!this.isFirstEnter) {
      this.formRetrieval.retrieveInternalFormData((formData2) => {
        this.accountNumber = formData2.accountNumber;
        this.beneficiaryAccountName = formData2.beneficiaryAccountName;
        this.intTransForm.get('beneficiaryAcctNum').setValue(formData2.beneficiaryAccountNumber);
        this.benAmount = formData2.benAmount;
        this.benNarration = formData2.benNarration;
      });
    }
    this.isFirstEnter = false;
  }

  ngOnDestroy() {
    if(this.httpSubscriptions.length > 0){
      this.httpSubscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }
}
