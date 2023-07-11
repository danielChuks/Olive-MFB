import { Component, OnInit } from '@angular/core';
import { PDFGenerator, PDFGeneratorOptions } from '@ionic-native/pdf-generator/ngx';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {


  status = 'Success';
  accountType = 'Savings Account';
  beneficiaryBank = 'Olive Bank';
  confirmationDetails: any;
  sourceAccount: '';
  narration: '';
  destinationAccount: '';
  amount: '';
  beneficiaryName: '';
  account = '';
  content: string;
  getintTransfer;

  constructor(private pdfGenerator: PDFGenerator) { }

  ngOnInit() {

    this.confirmationDetails = JSON.parse(sessionStorage.getItem('intTransfer'));
    const {sourceAccountNumber, narration, beneficiaryAccountNumber, transactionAmount, name} =  this.confirmationDetails;

this.account = sourceAccountNumber;
this.destinationAccount = beneficiaryAccountNumber;
this.amount = transactionAmount;
this.beneficiaryName = name;
this.narration = narration;
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
      }).catch((error) => {
      });

  }

}
