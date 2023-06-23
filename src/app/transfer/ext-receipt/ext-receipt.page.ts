/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { PDFGenerator, PDFGeneratorOptions } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-ext-receipt',
  templateUrl: './ext-receipt.page.html',
  styleUrls: ['./ext-receipt.page.scss'],
})
export class ExtReceiptPage implements OnInit {


  status = 'Success';
  accountType = 'Savings Account';
  beneficiaryBank;
  confirmationDetails: any;
  sourceAccount: '';
  narration: '';
  destinationAccount: '';
  amount: '';
  beneficiaryName;
  account = '';
  content: string;

  constructor(private pdfGenerator: PDFGenerator) { }

  ngOnInit() {

//     this.confirmationDetails = JSON.parse(sessionStorage.getItem('extTransferDetails'));
//     const {sourceAccountNumber, narration, beneficiaryAccountNumber, transactionAmount, beneficiaryName, bankName} =  this.confirmationDetails;

// this.account = sourceAccountNumber;
// this.destinationAccount = beneficiaryAccountNumber;
// this.amount = transactionAmount;
//     this.beneficiaryName = beneficiaryName;
//     this.beneficiaryBank = bankName;
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
        //console.log('OK', base64);
      }).catch((error) => {
        //console.log('error', error);
      });

  }

}
