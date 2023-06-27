import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonModal, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DashboardService } from 'src/app/hometab/dashboard.service';
import { BeneficiariesService } from 'src/app/manage-beneficiaries/beneficiaries.service';
import { BankListComponent } from './bank-list/bank-list.component';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { ExternalTransferModel } from '../ExternalTransferModel';
import { GeneralServiceService } from 'src/app/general-service.service';
import { FormRetrievalService } from 'src/app/hometab/formRetrieval.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { TransferService } from '../transfer.service';
import { Subscription } from 'rxjs';
import { ExternalBeneficiariesComponent } from '../external-beneficiaries/external-beneficiaries.component';



@Component({
  selector: 'app-other-transfer',
  templateUrl: './other-transfer.page.html',
  styleUrls: ['./other-transfer.page.scss'],
})
export class OtherTransferPage implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;
   banks: string[] = ['Access Bank Plc', 'Fidelity Bank Plc', 'First Bank', 'GT Bank', 'Jaiz Bank Plc'];
   results = [...this.banks];


  message = '';
  bAcctNo;
  limit = '';
  isValid = false;
  isAccount = false;
  isAcc = false;
  accountName = 'Anjola Adekunle';
  accountType = 'Savings Account';
  accountNumber = 'Select Account';
  beneficiaryBank = 'GTB';
  balance = '20,000';
  transfer = 'Transfer From';
  selectedAccount = '';
  transferTo = '';
  beneficiaryBankName = '';
  multipleAccounts;
  storedAccountNumber;
  bankName = 'Select Bank';
  bankCode;
  benAcctNo='';
  beneficiaryAccountName;
  extTransForm: FormGroup;
  extTransfer = new ExternalTransferModel();
  beneficiariesList;
  isFirstEnter = true;
  benAmount;
  benNarration;
  isAccountSelected = false;
  isBankSelected = true;
  isBeneficiarySelected = true;
  beneficiaryDetails: any;
  externalDetails: any;
  senderLastName;
  senderOtherName;
  externalName: any;
  filteredBenList: any;
  private httpSubscriptions: Subscription[] = [];



  constructor(private modalCtrl: ModalController,
     private dashboardService:  DashboardService,
     private beneficiariesService:  BeneficiariesService,
     private formBuilder: FormBuilder,
     private generalService: GeneralServiceService,
     private formRetrieval: FormRetrievalService,
     private platform: Platform,
     private transferService: TransferService,
    ) {
      this.extTransForm = this.formBuilder.group({
        amount : ['', [ Validators.required]],
        narration : ['', []],
      });
    }

    //creation of banks modal
    async openBankModal() {
      this.isBeneficiarySelected = false;
      const modal = await this.modalCtrl.create({
        component: BankListComponent,
        backdropBreakpoint: 0.1,
        initialBreakpoint: 600 / this.platform.height(),
      breakpoints: [0, 600 / this.platform.height()],
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        this.bankName = data.bankName;
        this.bankCode = data.bankCode;
      }
    }


  selectAccountNumber(acctno){
    this.isBankSelected = false;
    this.accountNumber = acctno;
    this.selectedAccount = acctno;
    sessionStorage.setItem('selectedAcct', this.selectedAccount); //get limit per account Number
    this.httpSubscriptions.push(this.transferService.getTransactionLimit()
    .subscribe(
      data=>{
      //  //console.log(data);
       this.limit = data.remainingTransactionAmount;
      },
      err=>{
    //console.log(err);
      }
    ));
   }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(accountNo, accountName, bankName, bankCode){
    this.modal.dismiss(accountNo, 'confirm');
    this.benAcctNo = accountNo;
    this.beneficiaryAccountName = accountName;
    this.bankName = bankName;
    this.bankCode = bankCode;
    //console.log(this.benAcctNo);
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
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

  toggleChange(e){
      this.beneficiaryDetails ={ senderAcctNo: sessionStorage.getItem('accountNumber'),
      beneficiaryAcctName: this.beneficiaryAccountName, bankName: this.bankName, bankCode:this.bankCode, beneficiaryAcctNo:this.benAcctNo};
      if(e.detail.checked === true){
         this.generalService.updateExternalBeneficiaryDetails(this.beneficiaryDetails);
      }
  }

  formatInput(inputValue: string) {
    const formattedValue = inputValue.replace(/,/g, '').replace(/[^\d\.]/g, ''); // remove all commas and non-numeric characters
    const parts = formattedValue.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';
    const integerDisplayValue = integerPart.replace(/\d(?=(\d{3})+$)/g, '$&,'); // add commas to integer part
    const displayValue = decimalPart ? integerDisplayValue + '.' + decimalPart : integerDisplayValue; // add decimal part if present
    this.extTransForm.get('amount').setValue(displayValue); // update the form control value
    }

  //continue to confirmation page function
  //the sources of the data will be different since it's really not a complete form
  externalTransfer(formGroup: FormGroup){
    this.extTransfer.sourceAccountNumber = this.accountNumber;
    this.extTransfer.sourceAccountName = '';
    this.extTransfer.transactionAmount = formGroup.value.amount;
    this.extTransfer.beneficiaryAccountNumber = this.benAcctNo;
    this.extTransfer.narration = formGroup.value.narration;
    this.extTransfer.bankName = this.bankName;
    this.extTransfer.beneficiaryBankID = this.bankCode;
    this.extTransfer.beneficiaryName = this.beneficiaryAccountName;//name enquiry is not being done

   this.externalName =  this.extTransfer.beneficiaryName.split(' ');
   this.extTransfer.transactionAmount = formGroup.value.amount.replaceAll(',', '');



      this.externalDetails = {
    senderLastName: this.senderLastName,
    senderOtherName: this.senderOtherName,
    senderAccountNumber: this.accountNumber,
    beneficiaryLastName: this.externalName[2],
    beneficiaryOtherName: this.externalName[1],
    beneficiaryEntityCode:  this.bankCode,
    beneficiaryAccountNumberOrCardNumber: this.benAcctNo,
    amount: formGroup.value.amount,
    // billerId: this.billerUniqueId,
   };

     //console.log(this.externalDetails);

    sessionStorage.setItem('extTransferDetails', JSON.stringify(this.extTransfer)); //to display in confirmation page
    sessionStorage.setItem('externalDetails', JSON.stringify(this.externalDetails));   //to be used for the post request

     this.formRetrieval.saveFormData(this.extTransfer.sourceAccountNumber, this.extTransfer.bankName,
      this.extTransfer.beneficiaryAccountNumber,
      this.extTransfer.narration, this.extTransfer.transactionAmount, this.extTransfer.beneficiaryName);
  }

  getNameEnquiry(e){
    this.bAcctNo = e.target.value;
    if(this.bAcctNo.length === 10){
      // sessionStorage.setItem('destinationAcct',  event.target.value);
      this.httpSubscriptions.push(this.dashboardService.getExternalAccountName(this.bankCode, this.bAcctNo)
      .subscribe(
         data=>{
      this.beneficiaryAccountName = data.accountName;
          this.isAccountSelected = true;
         },

         err=>{
          // //console.log(err);

          // this.selectedAccount = this.selectedBeneficiary;

          this.beneficiaryAccountName = 'Invalid Account Number';
            this.isAccountSelected = false; //check if account number is valid
        }
      ));
    }

    else{
      this.beneficiaryAccountName = 'Account number must be 10 digits';
      this.isAccountSelected = false;  //check if accountNumber is valid
    }
  }

// open beneficiaries modal
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ExternalBeneficiariesComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    // accountNo, accountName, bankName, bankCode
    if (role === 'confirm') {
      // this.benAcctNo = `${data.accountNumber}`;
      this.benAcctNo = data.accountNumber;
      // this.extTransForm.get('beneficiaryAcctNum').setValue(data.accountNumber);
      this.beneficiaryAccountName = data.accountName;
      this.isAccountSelected = data.sendTrue;
      this.bankCode = data.bankCode;
      this.bankName = data.bankName;
    }
  }



  ngOnInit() {
        //get the beneficiary full name and check for the empty space
     this.generalService.currentName.subscribe(name => {
       if (name[0] === '') {
         this.senderOtherName = name[2];
         this.senderLastName = name[3];
       }
       else {
       this.senderLastName = name[2];
       this.senderOtherName = name[1];
       }
     });



    this.httpSubscriptions.push(this.generalService.currentBeneficiary.subscribe(msg => {  //get beneficiary details from beneficiaries page
      this.benAcctNo = msg.benNo;
      this.beneficiaryAccountName = msg.benName;
      // this.extTransForm.get('beneficiaryAcctNum').setValue( msg.benNo);
 }));
    this.isAccount = false;
    this.accountNumber = 'Select Account';
    this.storedAccountNumber = JSON.parse(sessionStorage.getItem('accountNumber'));

    //get multiple accounts on initialization
    this.httpSubscriptions.push(this.dashboardService.getMultipleAccounts()
    .subscribe(
      data=>{
       this.multipleAccounts = data.multipleAccounts;
      //console.log(this.multipleAccounts);
      },

      err=>{
        //console.log(err);
      }
    ));

    // get beneficiaries list on initialization

    this.httpSubscriptions.push(this.beneficiariesService.getExternalBeneficiaryList()
    .subscribe(
      data=>{
        this.beneficiariesList = data.beneficiaryList;
        this.filteredBenList = data.beneficiaryList;
        //console.log(this.beneficiariesList);
      },

      err=>{
        //console.log(err.error.message ||  'Unable to reach server');
      }

    ));
  }

  ionViewWillEnter() {
    if (!this.isFirstEnter) {
      this.formRetrieval.retrieveFormData((formData) => {
        this.accountNumber = formData.accountNumber;
        this.beneficiaryAccountName = formData.beneficiaryAccountName;
        this.benAcctNo = formData.benAcctNo;
        this.benAmount = formData.benAmount;
        this.benNarration = formData.benNarration;
        this.bankName = formData.bankName;
        // this.extTransForm.get('beneficiaryAcctNum').setValue(formData.beneficiaryAccountNumber);

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
