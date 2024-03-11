/* eslint-disable radix */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { RouterOutlet, Router,  } from '@angular/router';
import { InternalTransferModel } from '../transfer/InternalTransferModel';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { DashboardService } from '../hometab/dashboard.service';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TransferService } from '../transfer/transfer.service';
import { PayBillsService } from './pay-bills.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { GeneralServiceService } from '../general-service.service';
import { FormRetrievalService } from '../hometab/formRetrieval.service';


@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.page.html',
  styleUrls: ['./pay-bills.page.scss'],
})
export class PayBillsPage implements  OnDestroy  {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  limit = '';
  obj: any = {
    id: '',
    namee: ''
  };
  beneficiaryAccountName = '';
  name: string;

  categoryName = 'Select Category';
  billerName = 'Select Biller';
  productName = 'Select Product';
  productAmount= '';
  selectedAccount = '';
  accountNumber = 'Select Account';
  myselectedAccount = '';
  multipleAccounts;
  categoryId;
  billerId;
  isAccount = false;
  categories;
  transfer: any = { accountNum: '', amount: '',  customer1: '', customer2: '' };
  billers: any[] = [];
  billerProduct: any[] = [];
  catId: '';
  selectedCategory;
  billerUniqueId: '';
  prod: '';
  paymentItemCode: '';
  transferInfo: any;
  categorySelected;
  nameOfCategory;
  nameofBiller;
  requiredField;
  isCustomerValid = false;
   //Disable Transaction Amount Field by default
  isDisabled = true;
  billerDisable = true;
  productDisable = true;
  isContinueDisabled = false;
  isSpinner = true;
  //Variables representing customer fields
  display = false;
  display2 = false;

  //Strings representing customer fields placeholders
  fieldResult1:  '';
  fieldResult2:  '';
  billsPaymentData: any;
  intTransForm: FormGroup;
  intTransfer = new InternalTransferModel();


  //track loading states
  isCategory = true;
  isBillers;
  isProducts;
  customerName = '';

  private httpSubscriptions: Subscription[] = [];




  constructor(private router: Router, private formBuilder: FormBuilder, private dashboardService: DashboardService,
    private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController, private transferService: TransferService,
    private payBillsService: PayBillsService,
     private nativeStorage: NativeStorage, private platform: Platform,
      private loadingCtrl: LoadingController,
      private generalService: GeneralServiceService,
      private formRetrieval: FormRetrievalService,) {
              this.intTransForm = this.formBuilder.group({

    });
  }

   formatInput(inputValue: string) {
    const formattedValue = inputValue.replace(/,/g, '').replace(/[^\d\.]/g, ''); // remove all commas and non-numeric characters
    const parts = formattedValue.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';
    const integerDisplayValue = integerPart.replace(/\d(?=(\d{3})+$)/g, '$&,'); // add commas to integer part
    const displayValue = decimalPart ? integerDisplayValue + '.' + decimalPart : integerDisplayValue; // add decimal part if present
    //  this.transfer.amount = displayValue; // update the form control value
    return displayValue;
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


  proceedToNextPage() {
    //get data for request and for confirmation
      this.transferInfo = {
    paymentCode: this.paymentItemCode,
    customerId: this.transfer.customer1,
    sourceAccountNumber: this.accountNumber,
    billerCategoryID: this.catId,
    billerId: this.billerUniqueId,
    transactionAmount: this.transfer.amount.replaceAll(',', ''),
    transactionDescription: this.prod,
    nameOfCategory: this.nameOfCategory,
    billerName: this.nameofBiller,
    requiredField : this.fieldResult1,
    mobileNumber: '',
    customerMail: '',
    customerName: this.customerName,
   };

   this.billsPaymentData = {
    paymentCode:this.paymentItemCode,
     customerId:this.transfer.customer1,
     sourceAccountNumber: this.selectedAccount,
     customerMobile: '',
     transactionAmount: this.transfer.amount.replaceAll(',', ''),
     customerMail: ''
    };

   sessionStorage.setItem('billsInfo', JSON.stringify(this.transferInfo));
   sessionStorage.setItem('billsPaymentData', JSON.stringify(this.billsPaymentData));
   this.router.navigateByUrl('/bills-activity');
  }

  continue() {
    // //onclick of transfer, check if meter no/id/smart card no is correct, if yes proceed to confirmation page, if no remain on that page
    // temporary fix for amount bug
    if(this.transfer.amount === ' '){
      this.generalService.alert('please ensure all required fields are filled before clicking continue');
      return;
    };
    this.handleCustomerId(this.transfer.customer1);
  }


selectAccountNumber(acctno){

  this.accountNumber = acctno;
  //console.log(this.accountNumber);
  this.selectedAccount = acctno; //pass selected account to next page
  sessionStorage.setItem('selectedAcct', this.selectedAccount);

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

internalTransfer(formGroup: FormGroup){
}

loadCategories() {
  this.categories = [];
  this.billers = [];
  this.billerProduct = [];
    this.transfer.amount = ' ';
    this.httpSubscriptions.push(this.payBillsService.getCategories()
    .subscribe(
      data => {
        // console.log(data)
        this.isCategory = false;
        this.categories = data.categorys.filter(
          (cat) =>
            ![
              '3',
              '4',
              '13',
              '15',
              '17',
              '21',
              '24',
              '25',
              '26',
              '30',
              '32',
              '36',
              '40',
              '44',
              '47',
              '49',
              '50',
              '55',
              '57',
              '62',
              '63',
              '65',
              '66',
              '68',
              '69',
              '70',
            ].includes(cat.categoryid)
        ); //remove categories that are not needed//remove airtime recharge from bills payment
        //console.log(this.categories);
        this.isCustomerValid = false;
      },
      err => {
        this.isCategory = false;
        this.generalService.loader();
      }
    ));
}


//load billers by category
loadBillersByCategory(categoryId: string) {
  this.display = false; this.display2 = false; this.transfer.customer1 = ''; this.transfer.customer2 = '';
  this.billers = []; this.billerProduct = []; this.billerDisable = true; this.productDisable = true;
this.catId = ''; this.billerUniqueId = ''; this.prod = ''; this.transfer.amount = '';
this.isBillers = true;


this.httpSubscriptions.push(this.payBillsService.getBillers(categoryId)
.subscribe(
    data => {
      this.isBillers = false;
       if (data.billers !== undefined) {
         this.billers = data.billers;
        this.billerDisable = false;
      }
        else {
      // this.errMessage = "No biller found for selected category, as such no transaction can be processed.";
      this.isBillers = false;
      this.billers = [];
      this.billerDisable = true;
      this.productDisable = true;
        this.transfer.amount = '';
        this.generalService.loader();
    }

    },
    err => {
      this.isBillers = false;
      this.generalService.loader();
      //console.log(err);
    }
));

for (let i = 0; i < this.categories.length; i++){
  if (categoryId === this.categories[i].categoryid) {
    this.nameOfCategory = this.categories[i].categoryname;
  }
}

}

 //get product(s) of billers
getBillerProduct(billerId: string) {
  //console.log('2 ran');
  // this.errMessage = "";
  this.display = false; this.display2 = false; this.transfer.customer1 = ''; this.transfer.customer2 = '';
  this.catId = ''; this.billerUniqueId = ''; this.prod = ''; this.transfer.amount = ''; this.billerProduct = [];
  this.isProducts = true;

  this.httpSubscriptions.push(this.payBillsService.getProducts(billerId)
    .subscribe(
      data => {
        if (data.paymentitems !== undefined) {
            this.billerProduct = data.paymentitems;
           this.productDisable = false;
           this.isProducts = false;
        }
        else {
        // this.errMessage = "No product found for selected biller, as such no transaction can be processed.";
        this.billerProduct = [];
        this.productDisable = true;
        this.isContinueDisabled = true;
        this.transfer.amount = '';
        this.isProducts = false;
        this.generalService.loader();
        }
      },
      err => {
        //console.log(err);
        this.isProducts = false;
        this.generalService.loader();
      }
  ));

  for(let i = 0; i<this.billers.length; i++){
    if(billerId === this.billers[i].billerid){
      this.nameofBiller = this.billers[i].billername;
        //console.log(this.nameofBiller);
    }
  }

}

getTransAmount(paymentItemId: string) {
   this.display = false; this.display2 = false; this.transfer.customer1 = ''; this.transfer.customer2 = '';
  // this.errMessage = "";
  let transactionAmount: '';
  let charges: '';
  let customerFd1: '';
  let customerFd2: '';

   //get the categoryid, biller id, product offered, paymentCode and transaction amount by looping through the biller products
  for (let i = 0; i < this.billerProduct.length; i++) {
    if (paymentItemId === this.billerProduct[i].paymentitemid) {
       this.catId = this.billerProduct[i].categoryid;
      this.billerUniqueId = this.billerProduct[i].billerid;
      this.prod = this.billerProduct[i].paymentitemname;
      this.paymentItemCode = this.billerProduct[i].paymentCode;
      transactionAmount = this.billerProduct[i].amount;
      charges = this.billerProduct[i]?.itemFee;
      break;
    }
  }

    //display transaction amount
  this.displayTransactionAmount(transactionAmount, charges);

  for (let i=0; i < this.billers.length; i++) {
    if (this.billerUniqueId === this.billers[i].billerid) {
      customerFd1 = this.billers[i].customerfield1;
      customerFd2 = this.billers[i].customerfield2;
      break;
    }
  }

  //display the hidden fields
  if (customerFd1 !== '' ) {
    this.display = true;
    // this.display2 = true;
    this.fieldResult1 = customerFd1;
    // this.fieldResult2 = customerFd2;
  }
  else {
    this.display = false;
    // this.display2 = false;
    this.fieldResult1 = '';
    // this.fieldResult2 = '';
  }

}

//method that handles the display of the transaction amount
displayTransactionAmount(transactionAmount, charge) {
  if (transactionAmount === '0') {
    //Enable transaction amount field
    this.transfer.amount = '';
    this.isDisabled = false;
  }
  else {
    this.isDisabled = true;
    const convertedCharge: number = parseInt(charge); //converted the charge to a number
    const convertedAmt: number = parseInt(transactionAmount); //converted the string to a number
    const formattedAmount: number =
      convertedAmt / 100 + convertedCharge / 100; //converted amount to naira
       this.transfer.amount = this.formatInput(formattedAmount.toString());
  }
}

async handleCustomerId(id: string) {
  //call function that gets data for api and confirmation page
  //navigate to confirmation page if the id validation is successful
  if (!id || id.trim() === '') {
    this.isCustomerValid = false;
    return;
  }
  const customerData = {
    customerId: id,
    paymentCode: this.paymentItemCode,
  };
  console.log(customerData);
  const loading = await this.presentLoading();
  this.payBillsService.validateCustomer(customerData).subscribe(
    (data) => {
      if (data?.Customers[0].fullName) {
        this.customerName = data?.Customers[0].fullName;
        console.log(data?.Customers[0].fullName);
        loading.dismiss();
        this.proceedToNextPage();
      } else {
        console.log(
          `The number ${id} is expired or cannot be validated at this time`
        );
        this.isCustomerValid = true;
        this.customerName = `The number ${id} cannot be validated at the moment, please try again later`;
        setTimeout(() => {
          this.isCustomerValid = false;
        }, 6000);
      }
      loading.dismiss();
    },
    (err) => {
      console.log(err);
      this.customerName = `The number ${id} cannot be validated at the moment, please try again later`;
      loading.dismiss();

      // Set a timeout to reset isCustomerValid to false after 3 seconds
      setTimeout(() => {
        this.isCustomerValid = false;
      }, 3000);
    }
  );
}
  //listen for changes when the field is empty so set the customer name back to
  handleInputChange(e){
    if(!e.target.value){
      this.customerName = '';
    }
    }

ionViewWillEnter() {
  console.log('i just entered');
  this.loadCategories();
  this.isCategory = true;
   this.isAccount = false;
   this.selectedAccount = '';

  this.accountNumber = 'Select Account';
  this.httpSubscriptions.push(this.dashboardService.getMultipleAccounts()
  .subscribe(
    data=>{
     this.multipleAccounts = data;
    },

    err=>{
      //console.log(err);
    }
  ));
}

ngOnDestroy() {
  this.httpSubscriptions.forEach(subscription => subscription.unsubscribe());
}
}



