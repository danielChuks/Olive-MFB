/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { PDFGenerator, PDFGeneratorOptions } from '@ionic-native/pdf-generator/ngx';
import { DatePipe } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
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
  senderAccountName = '';
  referenceID = '';
  amount: '';
  beneficiaryName;
  account = '';
  content: string;
  extTransferName;
  transDate: string;

  constructor(private pdfGenerator: PDFGenerator, private datePipe: DatePipe, private socialSharing: SocialSharing) {
    this.transDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');}

    ngOnInit() {

      this.confirmationDetails = JSON.parse(
        sessionStorage.getItem('extTransferDetails')
      );
      this.extTransferName = JSON.parse(
        sessionStorage.getItem('externalDetails')
      );
      const {
        sourceAccountNumber,
        narration,
        beneficiaryAccountNumber,
        transactionAmount,
        beneficiaryName,
        bankName,
        paymentReference
      } = this.confirmationDetails;
      const { senderLastName, senderOtherName } = this.extTransferName;
      this.account = sourceAccountNumber ? sourceAccountNumber.replace(/\d{5}$/, '*****') : '';
      this.senderAccountName = `${senderLastName} ${senderOtherName}`;
      this.destinationAccount = beneficiaryAccountNumber;
      this.amount = transactionAmount;
      this.beneficiaryName = beneficiaryName;
      this.beneficiaryBank = bankName;
      this.referenceID = paymentReference;
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
        //console.log('OK', base64);
      }).catch((error) => {
        //console.log('error', error);
      });

  }

  async share() {
    try {
      // Generate the PDF and get the base64 data
      const content = document.getElementById('PrintInvoice').innerHTML;
      const options: PDFGeneratorOptions = {
        documentSize: 'A4',
        type: 'base64', // Generate as base64 data
        fileName: 'Transfer Receipt.pdf',
      };
      const base64 = await this.pdfGenerator.fromData(content, options);

      // Share the PDF using socialSharing
      await this.socialSharing.share(
        'Transfer Receipt',
        `data:application/pdf;base64,${base64}`, // Attach the PDF as base64 data
      );

      console.log('Shared PDF successfully');
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
  }

}
