import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DashboardService } from '../hometab/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferService } from '../transfer/transfer.service';
import { TopUpService } from './top-up.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AirtimeModel } from './airtimeModel';
import { GeneralServiceService } from '../general-service.service';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.page.html',
  styleUrls: ['./top-up.page.scss'],
})
export class TopUpPage implements OnInit {
  multipleAccounts: any[] = [];
  billerName = 'Select Network Carrier';
  billerNameSeg2 = 'Select Network Carrier';
  selectBundle = 'Select Bundle';
  billers: any;
  airtimeRecharge1: any = {
    account: '',
    mobileNumber: '',
    operator: '',
    amount: '',
  };

  airtimeRecharge2: any = {
    account: '',
    mobileNumber: '',
    operator: '',
    amount: '',
  };
  errMessage: string;
  paymentItemCode: string;
  operators: string[];
  productType: any = [];
  connectType: string;
  msg: string;
  showAlert: any = null;
  // disabled Fields
  disabledProductType = true;
  disabledAmount = true;
  loading: any;
  message = '';
  modelData: any;
  selectedId; //define id
  segmentModel = 'seg1';
  airtimeForm: FormGroup;
  mobileDataForm: FormGroup;
  accountNumber = 'Select Account';
  selectedAccount = '';
  isAccount = false;
  limit = '';
  bundles;
  billerProducts: any[] = [];
  dataAmount;
  airtimeAmount;
  airtimeDetails = new AirtimeModel();
  mobileDataDetails = new AirtimeModel();
  paymentCode;
  billerId;
  serviceProvider;
  airtimePaymentCode;
  airtimeBillerId;
  airtimeserviceProvider;
  isNumberDisabled = true;
  isAmountDisabled = true;
  isAccountSelected = false;
  airtimeInfo: any;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private transferService: TransferService,
    private topUpService: TopUpService,
    private generalService: GeneralServiceService,
    private http: HttpClient
  ) {
    this.airtimeForm = this.formBuilder.group({
      airtimeNumber: ['', [Validators.required, Validators.minLength(11)]],
      airtimeAmount: ['', [Validators.required]],
    });

    this.mobileDataForm = this.formBuilder.group({
      mobileDataNumber: ['', [Validators.required]],
      mobileDataAmount: ['', [Validators.required]],
    });
  }

  selectAccountNumber(acctno) {
    this.isAccountSelected = true;
    this.accountNumber = acctno;
    this.selectedAccount = acctno; //pass selected account to next page
    sessionStorage.setItem('selectedAcct', this.selectedAccount);

    this.transferService.getTransactionLimit().subscribe(
      (data) => {
        this.limit = data.remainingTransactionAmount;
      },
      (err) => {}
    );
  }
  //airtime
  selectCarrier(e) {
    this.isNumberDisabled = false;
    this.isAmountDisabled = false;
    this.openBundle(e.target.value);

    for (let i = 0; i <= this.billers.length; i++) {
      if (e.target.value === this.billers[i].billerid) {
        this.airtimeserviceProvider = this.billers[i].billername.split(' ')[0];
        break; //billername
      }
    }
  }

  //carrier for bundle
  selectCarrierForBundle(e) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.billers.length; i++) {
      if (e.target.value === this.billers[i].billerid) {
        this.serviceProvider = this.billers[i].billername; //can splice this if need be
      }
    }
    this.openBundle(e.target.value); //pass carrier id to bundle function
  }

  // select bundle
  openBundle(id) {
    this.http
      .get<any>(
        `${
          environment.baseApi + `quickteller` + `/billerPaymentItems` + `/${id}`
        }`
      )
      .subscribe(
        (data) => {
          this.billerProducts = data.paymentitems;
          for (let i = 0; i <= this.billerProducts.length; i++) {
            if (this.billerProducts[i].paymentitemname === 'Specify Amount') {
              this.airtimePaymentCode = this.billerProducts[i].paymentCode;
              this.airtimeBillerId = this.billerProducts[i].billerid;
              break;
            }
          }
        },
        (err) => {}
      );
  }


  formatInput(inputValue: string) {
    const formattedValue = inputValue.replace(/,/g, '').replace(/[^\d\.]/g, ''); // remove all commas and non-numeric characters
    const parts = formattedValue.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';
    const integerDisplayValue = integerPart.replace(/\d(?=(\d{3})+$)/g, '$&,'); // add commas to integer part
    const displayValue = decimalPart
      ? integerDisplayValue + '.' + decimalPart
      : integerDisplayValue; // add decimal part if present
    this.airtimeForm.get('airtimeAmount').setValue(displayValue);
    this.mobileDataForm.get('mobileDataAmount').setValue(displayValue); // update the form control value
    // update the form control value
  }

  submitAirtimeDetails(formGroup: FormGroup) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    this.airtimeDetails.sourceAccountNumber = this.accountNumber;
    this.airtimeDetails.customerId = formGroup.value.airtimeNumber;
    this.airtimeDetails.customerMobile = formGroup.value.airtimeNumber;
    this.airtimeDetails.mobileOperatorDescription = this.airtimeserviceProvider;
    this.airtimeDetails.mobileOperatorID = this.airtimeBillerId;
    this.airtimeDetails.paymentCode = this.airtimePaymentCode;
    this.airtimeDetails.customerEmail = '';
    this.airtimeDetails.transactionAmount = formGroup.value.airtimeAmount.replaceAll(',', '');
    this.airtimeDetails.paymentCode = this.airtimePaymentCode;
    // eslint-disable-next-line max-len
    this.airtimeInfo = {
      sourceAccountNumber: this.accountNumber,
      paymentCode: this.airtimePaymentCode,
      transactionAmount: formGroup.value.airtimeAmount.replaceAll(',', ''),
      customerMobile: formGroup.value.airtimeNumber,
      customerEmail: '',
    };
    console.log(this.airtimeInfo);
    sessionStorage.setItem('airtimeInfo', JSON.stringify(this.airtimeInfo)); //details to use for the request

    this.generalService.updateAirtimeDetails(this.airtimeDetails); //details for display on confirmation page
  }

  submitDataDetails(formGroup: FormGroup) {
    this.mobileDataDetails.sourceAccountNumber = this.accountNumber;
    this.mobileDataDetails.customerId = formGroup.value.mobileDataNumber;
    this.mobileDataDetails.initiatingApp = '';
    this.mobileDataDetails.customerMobile = formGroup.value.mobileDataNumber;
    this.mobileDataDetails.mobileOperatorDescription = '  Mobile Recharge';
    this.mobileDataDetails.mobileOperatorID = this.billerId;
    this.mobileDataDetails.narration = '';
    this.mobileDataDetails.paymentCode = this.paymentCode;
    this.mobileDataDetails.taxAmount = '';
    this.mobileDataDetails.mobileOperatorName = this.serviceProvider;
    this.mobileDataDetails.transactionAmount =
      formGroup.value.mobileDataAmount.replaceAll(',', '');

    this.generalService.updateAirtimeDetails(this.mobileDataDetails);
  }

  getAmount(id) {
    let transactionAmount = '';
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.billerProducts.length; i++) {
      if (id === this.billerProducts[i].paymentitemid) {
        transactionAmount = this.billerProducts[i].amount;
        this.paymentCode = this.billerProducts[i].paymentCode;
        this.billerId = this.billerProducts[i].billerid;
        break;
      }
    }

    //display transaction amount
    this.displayTransactionAmount(transactionAmount);
  }

  //  method that handles the display of the transaction amount
  displayTransactionAmount(transactionAmount) {
    if (transactionAmount === '0') {
      //Enable transaction amount field
      this.dataAmount = '';
    } else {
      // eslint-disable-next-line radix
      const convertedAmt: number = parseInt(transactionAmount); //converted the string to a number
      const formattedAmount: number = convertedAmt / 100; //converted the string to 2 decimal places
      this.dataAmount = formattedAmount;
    }
  }

  ngOnInit() {
    this.isAccountSelected = false;
    this.isAmountDisabled = true;
    this.isNumberDisabled = true;
    this.isAccount = false;
    this.accountNumber = 'Select Account';
    this.dashboardService.getMultipleAccounts().subscribe(
      (data) => {
        this.multipleAccounts = data;
      },

      (err) => {
      }
    );

    this.topUpService.getBillersList().subscribe(
      (data) => {
        this.billers = data.billers.filter(
          (biller) => biller.billerid !== '108'
        );
      },

      (err) => {}
    );
  }

  segmentChanged(event) {
    this.dataAmount = '';
  }
}
