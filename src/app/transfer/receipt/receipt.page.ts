import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PDFGenerator, PDFGeneratorOptions } from '@ionic-native/pdf-generator/ngx';
import { DatePipe } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  providers: [DatePipe],
})
export class ReceiptPage implements OnInit {

  @ViewChild('printInvoice', { static: false }) printInvoice: ElementRef;

  status = 'Success';
  accountType = 'Savings Account';
  beneficiaryBank = 'NMF Bank';
  confirmationDetails: any;
  sourceAccount: '';
  senderAccountName = '';
  narration: '';
  destinationAccount: '';
  amount: '';
  beneficiaryName: '';
  referenceID = '';
  account = '';
  content: string;
  getintTransfer;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IntTransferName;
    transDate: string;


  constructor(private pdfGenerator: PDFGenerator, private datePipe: DatePipe, private socialSharing: SocialSharing) {
    this.transDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }
  ngOnInit() {

    this.confirmationDetails = JSON.parse(sessionStorage.getItem('intTransfer'));
    this.IntTransferName = JSON.parse(sessionStorage.getItem('Name'));
    const {
      sourceAccountNumber,
      narration,
      beneficiaryAccountNumber,
      transactionAmount,
      name,
      txnReference
    } = this.confirmationDetails;
    const { senderLastName, senderOtherName } = this.IntTransferName;
    this.senderAccountName = `${senderLastName} ${senderOtherName}`;
    this.account = sourceAccountNumber ? sourceAccountNumber.replace(/\d{5}$/, '*****') : '';
    this.destinationAccount = beneficiaryAccountNumber;
    this.amount = transactionAmount;
    this.beneficiaryName = name;
    this.referenceID = txnReference;
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

  async share() {
    try {
      // Generate the PDF and get the base64 data
      const content = document.getElementById('PrintInvoice').innerHTML;
      const options: PDFGeneratorOptions = {
        documentSize: 'A4',
        type: 'base64', // Generate as base64 data
        fileName: 'TransferReceipt.pdf',
      };
      const base64 = await this.pdfGenerator.fromData(content, options);

      await this.socialSharing.share(
        'Check out this awesome PDF!',
        'Transfer Receipt',
        `data:application/pdf;base64,${base64}`, // Attach the PDF as base64 data
        null // URL (optional)
      );
      console.log('Shared PDF successfully');
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
  }

}
