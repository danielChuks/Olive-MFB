/* eslint-disable radix */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { IonModal, Platform } from '@ionic/angular';
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
import { GeneralServiceService } from '../general-service.service';


@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.page.html',
  styleUrls: ['./pay-bills.page.scss'],
})
export class PayBillsPage implements OnDestroy  {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  limit = '';
  obj: any = {
    id: '',
    namee: ''
  };
  beneficiaryAccountName = '';
  name: string;
  banks: string[] = ['Access Bank', 'Fidelity Bank', 'First Bank', 'GT Bank'];
  results = [...this.banks];
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
   //Disable Transaction Amount Field by default
  isDisabled = true;
  billerDisable = true;
  productDisable = true;
  isContinueDisabled = false;

  //Variables representing customer fields
  display = false;
  display2 = false;

  //Strings representing customer fields placeholders
  fieldResult1:  '';
  fieldResult2:  '';
  billsPaymentData: any;


//track loading states
isCategory = true;
isBillers;
isProducts;

  intTransForm: FormGroup;
  intTransfer = new InternalTransferModel();
  private httpSubscriptions: Subscription[] = [];


  constructor(private router: Router, private formBuilder: FormBuilder, private dashboardService: DashboardService,
    private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController, private transferService: TransferService,
    private payBillsService: PayBillsService, private nativeStorage: NativeStorage, private platform: Platform,
    private generalService: GeneralServiceService) {
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





  async continue() {
    // eslint-disable-next-line max-len
    // let transferInfo: any = {paymentCode: this.paymentItemCode, customerId: this.customerId, fromAccountNumber:this.transfer.accountNum,
    //  billerCategoryID: this.catId, billerDescription: this.billerUniqueId, transactionAmount:amount*100,
    // transactionDescription:this.prod, cardNumber:'',chargeAmount:10000,taxAmount: 0, initiatingApp:"MAPP"};
  this.transferInfo = {
    paymentCode: this.paymentItemCode,
    customerId: this.transfer.customer1,
    sourceAccountNumber: this.accountNumber,
    billerCategoryID: this.catId,
    billerId: this.billerUniqueId,
    transactionAmount: this.transfer.amount.replaceAll(',', ''),//replaceAll method
    transactionDescription: this.prod,
    nameOfCategory: this.nameOfCategory,
    billerName: this.nameofBiller,
    requiredField : this.fieldResult1,
    mobileNumber: '',
    customerMail: '',
    };

    // console.log(this.transfer.amount.replaceAll(',', ''));

   this.billsPaymentData = {
    paymentCode:this.paymentItemCode,
     customerId:this.transfer.customer1,
     sourceAccountNumber: this.selectedAccount,
     customerMobile: '',
     transactionAmount: this.transfer.amount.replaceAll(',', ''),
     customerMail: ''
    };

   sessionStorage.setItem('transferInfo', JSON.stringify(this.transferInfo)); //use rxjs instead to solve the storage caching ish
   sessionStorage.setItem('billsPaymentData', JSON.stringify(this.billsPaymentData));
}




handleChange(event) {
  const query = event.target.value.toLowerCase();
  this.results = this.banks.filter(d => d.toLowerCase().indexOf(query) > -1);
}



selectAccountNumber(acctno){

  this.accountNumber = acctno;
  this.selectedAccount = acctno; //pass selected account to next page
  sessionStorage.setItem('selectedAcct', this.selectedAccount);

  this.httpSubscriptions.push(this.transferService.getTransactionLimit()
  .subscribe(
    data=>{
     this.limit = data.remainingTransactionAmount;
    },
    err=>{
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
        this.isCategory = false;
        this.categories = data.categorys.filter(cat=> cat.categoryid !== '4'); //remove airtime recharge from bills payment
        //console.log(this.categories);
      }, err => {
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
      }
  ));

  for(let i = 0; i<this.billers.length; i++){
    if(billerId === this.billers[i].billerid){
      this.nameofBiller = this.billers[i].billername;
    }
  }

}

getTransAmount(paymentItemId: string) {
   this.display = false; this.display2 = false; this.transfer.customer1 = ''; this.transfer.customer2 = '';
  let transactionAmount: '';
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
      break;
    }
  }

    //display transaction amount
  this.displayTransactionAmount(transactionAmount);

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
    this.fieldResult1 = customerFd1;
  }
  else {
    this.display = false;
    this.fieldResult1 = '';
  }

}

//method that handles the display of the transaction amount
displayTransactionAmount(transactionAmount) {
  if (transactionAmount === '0') {
    //Enable transaction amount field
    this.transfer.amount = '';
    this.isDisabled = false;
  }
  else {
    this.isDisabled = true;
    const convertedAmt: number = parseInt(transactionAmount); //converted the string to a number
    const formattedAmount: number = (convertedAmt / 100); //converted the string to 2 decimal places
    this.transfer.amount = this.formatInput(formattedAmount.toString());
  }
}



ionViewWillEnter() {
  this.loadCategories();
  this.isCategory = true;
   this.isAccount = false;
  this.accountNumber = 'Select Account';
  // this.accountNumber = JSON.parse(sessionStorage.getItem('accountNumber'));
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
}


ngOnDestroy() {
  this.httpSubscriptions.forEach(subscription => subscription.unsubscribe());
}
}
