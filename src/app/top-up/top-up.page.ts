import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DashboardService } from '../hometab/dashboard.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { TransferService } from '../transfer/transfer.service';
import { TopUpService } from './top-up.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AirtimeModel } from './airtimeModel';
import { GeneralServiceService } from '../general-service.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.page.html',
  styleUrls: ['./top-up.page.scss'],
})
export class TopUpPage implements OnInit {


  multipleAccounts: any[] = [];
  billerName= 'Select Network Carrier';
  billerNameSeg2='Select Network Carrier';
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
  message= '';
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
  dataBundles: any[] = [];
  dataPaymentCode;
  dataServiceProvider;
  selectedBundle;
  isBundle = false;

  tempBillersList: any[] = [
    {
      id: 1,
      billerName: '9MOBILE',
      paymentCode: '90806'
    },
    {
      id: 2,
      billerName: 'AIRTEL',
      paymentCode: '61701'
    },
    {
      id: 3,
      billerName: 'MTN',
      paymentCode: '90304'
    },
    {
      id: 4,
      billerName: 'GLO',
      paymentCode: '91309'
    },
  ];

  tempDataBillers: any[] = [
    {
      id: 1,
      billerName: '9MOBILE',
      billerid: '205'
    },
    {
      id: 2,
      billerName: 'AIRTEL',
      billerid: '923'
    },
    {
      id: 3,
      billerName: 'MTN',
      billerid: '348'
    },
    {
      id: 4,
      billerName: 'GLO',
      billerid: '3070'
    },
  ];


  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private transferService: TransferService,
    private topUpService: TopUpService,
    private generalService: GeneralServiceService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
  private http: HttpClient) {

    this.airtimeForm = this.formBuilder.group({
      airtimeNumber: ['', [ Validators.required, Validators.minLength(11)]],
      airtimeAmount: ['', [Validators.required]],
    });


    this.mobileDataForm = this.formBuilder.group({
      mobileDataNumber: ['', [  Validators.required]],
      mobileDataAmount : ['', [ Validators.required]],
    });

   }

   ngOnInit() {
    this.isAccountSelected = false;
    this.isAmountDisabled = true;
    this.isNumberDisabled = true;
      this.isAccount = false;
     this.accountNumber = 'Select Account';
     // console.log(this.airtimeForm.valid);
     this.dashboardService.getMultipleAccounts()
     .subscribe(
       data=>{
        this.multipleAccounts = data;
       },

       err=>{
         //console.log(err);
         this.isBundle = false;
         this.generalService.loader();
       }
     );
     //  this.topUpService.getBillersList()
     //   .subscribe(
     //     data => {
     //       this.billers = data.billers.filter(biller=> biller.billerid !== '108');
     //       console.log(data.billers);
     //     },

     //     err => {
     //       //console.log(err);
     //     }
     //   );
   }


  selectAccountNumber(acctno) {
    this.isAccountSelected = true;
    this.accountNumber = acctno;
    this.selectedAccount = acctno; //pass selected account to next page
   sessionStorage.setItem('selectedAcct', this.selectedAccount);

     this.transferService.getTransactionLimit()
    .subscribe(
      data=>{
      //  console.log(data);
       this.limit = data.remainingTransactionAmount;
      },
      err=>{
    //console.log(err);
      }
    );
  }
//airtime
  selectCarrier(e) {
    this.isNumberDisabled = false;
    this.isAmountDisabled = false;
     this.openBundle(e.target.value);
     for(let i = 0; i<=this.billers.length; i++){
      if(e.target.value === this.billers[i].billerid){
       this.airtimeserviceProvider = this.billers[i].billername.split(' ')[0];
       //console.log(this.airtimeserviceProvider);
       break; //billername
      }
     }
  }

  //carrier for bundle
  selectCarrierForBundle(e) {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i = 0; i<this.billers.length; i++){
      if(e.target.value === this.billers[i].billerid){
        this.serviceProvider = this.billers[i].billername; //can splice this if need be
      }
    }
    //console.log(e.target.value);
    this.openBundle(e.target.value); //pass carrier id to bundle function
  }

// select bundle
openBundle(id) {
 this.http.get<any> (`${environment.baseApi + `quickteller` + `/billerPaymentItems` + `/${id}`}`)
  .subscribe(
 data=>{
this.billerProducts = data.paymentitems;
console.log(this.billerProducts);
for(let i = 0; i<=this.billerProducts.length; i++){
  if(this.billerProducts[i].paymentitemname === 'Specify Amount'){
   this.airtimePaymentCode = this.billerProducts[i].paymentCode;
   this.airtimeBillerId = this.billerProducts[i].billerid;
   break;
  }
}
 },
 err=>{
   //console.log(err);
 }
  );
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: '',
      cssClass: 'custom-loading',
        backdropDismiss: false,
    });
    await loading.present();
    return loading;
  }

//temporary fix start
tempselectedCarrier(e){
  //set paymentcode
  this.airtimePaymentCode = e.target.value;
  //fet biller name for display in confirmation page
  for(let i = 0; i<=this.tempBillersList.length; i++){
    if(this.tempBillersList[i].paymentCode === e.target.value){
      this.airtimeserviceProvider = this.tempBillersList[i].billerName;
      break;
    }
  }
  this.isNumberDisabled = false;
  this.isAmountDisabled = false;
}

async getTempBundle(e){
  for(let i = 0; i<=this.tempDataBillers.length; i++){
    if(this.tempDataBillers[i].billerid === e.target.value){
      this.dataServiceProvider = this.tempDataBillers[i].billerName;
      break;
    }
  }

  this.mobileDataForm.get('mobileDataAmount').setValue('');
  this.dataBundles = [];
  const id = e.target.value;
  this.isBundle = true;

  this.topUpService.getDataBundles(id).subscribe((data)=>{
    this.isBundle = false;
       this.dataBundles = data.paymentitems;
      console.log(data.paymentitems);
  },
  error=>{
    this.isBundle = false;
    this.generalService.loader();
  }
  );
}

getTempAmount(bundleId: any){
  let transactionAmount = '';
  //console.log(bundleId);
   for(let i = 0; i<=this.dataBundles.length; i++){
        if(this.dataBundles[i].paymentCode === bundleId){
          transactionAmount = this.dataBundles[i].amount;
          this.dataPaymentCode = bundleId;
          break;
        }
   }

   //display transaction amount
   this.displayTransactionAmount(transactionAmount);
}

onChange(inputValue: string){
const formattedAmount = this.generalService.formatAmount(inputValue);
this.airtimeForm.get('airtimeAmount').setValue(formattedAmount);
this.mobileDataForm.get('mobileDataAmount').setValue(formattedAmount);
}



  submitAirtimeDetails(formGroup: FormGroup){
    // eslint-disable-next-line @typescript-eslint/prefer-for-of

    // this.airtimeDetails.sourceAccountNumber = this.accountNumber;
    // this.airtimeDetails.customerId = '234' + formGroup.value.airtimeNumber;
    // this.airtimeDetails.customerMobile = '234' + formGroup.value.airtimeNumber;
    // this.airtimeDetails.mobileOperatorDescription = this.airtimeserviceProvider;
    // this.airtimeDetails.mobileOperatorID = this.airtimeBillerId;
    // this.airtimeDetails.paymentCode = this.airtimePaymentCode;
    // this.airtimeDetails.customerEmail = '';
    // this.airtimeDetails.transactionAmount = formGroup.value.airtimeAmount.replaceAll(',', '');
    // this.airtimeDetails.paymentCode = this.airtimePaymentCode;

    //temp fix confirmation details
    this.airtimeDetails.sourceAccountNumber = this.accountNumber;
    this.airtimeDetails.customerId = '234' + formGroup.value.airtimeNumber;
    this.airtimeDetails.customerMobile = '234' + formGroup.value.airtimeNumber;
    this.airtimeDetails.mobileOperatorDescription = this.airtimeserviceProvider;
    this.airtimeDetails.transactionAmount = formGroup.value.airtimeAmount.replaceAll(',', '');
    this.airtimeDetails.productName = 'Airtime Recharge';


    // eslint-disable-next-line max-len
    this.airtimeInfo = {
      sourceAccountNumber: this.accountNumber,
      paymentCode: this.airtimePaymentCode,
      transactionAmount: formGroup.value.airtimeAmount.replaceAll(',', ''),
      customerMobile: '234' + formGroup.value.airtimeNumber,
      customerEmail: ''
    };

      sessionStorage.setItem('airtimeInfo', JSON.stringify(this.airtimeInfo)); //details to use for the request
    this.generalService.updateAirtimeDetails(this.airtimeDetails); //details for display on confirmation page
  }

  submitDataDetails(formGroup: FormGroup){
    // this.mobileDataDetails.sourceAccountNumber = this.accountNumber;
    // this.mobileDataDetails.customerId = formGroup.value.mobileDataNumber;
    // this.mobileDataDetails.initiatingApp = '';
    // this.mobileDataDetails.customerMobile = formGroup.value.mobileDataNumber;;
    // this.mobileDataDetails.mobileOperatorDescription = 'Data Recharge';
    // this.mobileDataDetails.mobileOperatorID = this.billerId;
    // this.mobileDataDetails.narration = '';
    // this.mobileDataDetails.paymentCode = this.paymentCode;
    // this.mobileDataDetails.taxAmount = '';
    // this.mobileDataDetails.mobileOperatorName = this.serviceProvider;
    // this.mobileDataDetails.transactionAmount = formGroup.value.mobileDataAmount.replaceAll(',', '');

    const dataInfo = {
      sourceAccountNumber: this.accountNumber,
      paymentCode: this.dataPaymentCode,
      transactionAmount: formGroup.value.mobileDataAmount.replaceAll(',', ''),
      customerMobile: '234' + formGroup.value.mobileDataNumber,
      customerEmail: ''
    };

    //temp fix confirmation details
    this.mobileDataDetails.sourceAccountNumber = this.accountNumber;
    this.mobileDataDetails.customerId = '234' +  formGroup.value.mobileDataNumber;
    this.mobileDataDetails.customerMobile = '234' +  formGroup.value.mobileDataNumber;
    this.mobileDataDetails.mobileOperatorDescription = this.dataServiceProvider;
    this.mobileDataDetails.transactionAmount = formGroup.value.mobileDataAmount.replaceAll(',', '');
    this.mobileDataDetails.productName = 'Data Recharge';



    sessionStorage.setItem('airtimeInfo', JSON.stringify(dataInfo)); //post request
    this.generalService.updateAirtimeDetails(this.mobileDataDetails); //confirmation data
  }

  getAmount(id){
    let transactionAmount = '';
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.billerProducts.length; i++) {
      if (id === this.billerProducts[i].paymentitemid) {
       transactionAmount = this.billerProducts[i].amount;
          this.paymentCode= this.billerProducts[i].paymentCode;
          this.billerId = this.billerProducts[i].billerid;
          // this.serviceProvider = this.billerProducts[i].billername;
        break;
      }
    }

     //display transaction amount
     this.displayTransactionAmount(transactionAmount);

  }

  //  method that handles the display of the transaction amount
  displayTransactionAmount(transactionAmount){
    if (transactionAmount === '0') {
      //Enable transaction amount field
      this.mobileDataForm.get('mobileDataAmount').setValue('');
      // this.isDisabled = false;
    }
    else {
      // this.isDisabled = true;
      // eslint-disable-next-line radix
      const convertedAmt: number = parseInt(transactionAmount); //converted the string to a number
      const formattedAmount: number = (convertedAmt / 100); //converted the string to 2 decimal places
      const inputAmount =  Math.ceil(formattedAmount); //roumd up to nearest integer
      this.generalService.formatAmount(inputAmount.toString()); //add commas to amount
    }
  }

  splitTextFromFirstCapital(text: string): string[] {
    const regex = /[\w-]+/g;
    return text.match(regex) || [];
  }

  segmentChanged(event){
    //console.log(this.segmentModel);
    this.dataAmount = '';
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [`OK`]
    });

    await alert.present();
  }
}
