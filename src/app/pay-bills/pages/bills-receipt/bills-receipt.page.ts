import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { PDFGenerator, PDFGeneratorOptions } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-bills-receipt',
  templateUrl: './bills-receipt.page.html',
  styleUrls: ['./bills-receipt.page.scss'],
})
export class BillsReceiptPage implements OnInit {

  category;
  product;
  transferInfo;
  recipient;
  savedDetails;
  customerId;
  requiredField;
  accountNumber;
  amount;
  status = 'Success';
  content: string;


  constructor(private nativeStorage: NativeStorage, private pdfGenerator: PDFGenerator ) { }

 retrieveTransferInfo() {

    this.savedDetails = JSON.parse(sessionStorage.getItem('transferInfo'));
    this.accountNumber = this.savedDetails.sourceAccountNumber;
    this.recipient = this.savedDetails.billerName;
    this.category = this.savedDetails.nameOfCategory;
    this.product = this.savedDetails.transactionDescription;
    this.amount = this.savedDetails.transactionAmount;
    this.customerId = this.savedDetails.customerId;
    this.requiredField = this.savedDetails.requiredField;

  }


  ngOnInit() {
    this.retrieveTransferInfo();
  }

  downloadInvoice() {
    this.content = document.getElementById('PrintInvoice').innerHTML;
    const options: PDFGeneratorOptions = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'Transfer.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });

  }
}
