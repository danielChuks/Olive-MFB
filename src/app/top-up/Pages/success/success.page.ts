import { Component, OnInit } from '@angular/core';
import {
  PDFGenerator,
  PDFGeneratorOptions,
} from '@ionic-native/pdf-generator/ngx';
import { GeneralServiceService } from 'src/app/general-service.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  amount;
  status = 'Success';
  accountType = 'Savings Account';
  accountName = 'Anjola Adekunle';
  accountNumber;
  beneficiaryBank = 'GTB';
  phoneNo;
  carrier;
  content: string;

  constructor(
    private generalService: GeneralServiceService,
    private pdfGenerator: PDFGenerator
  ) {}

  ngOnInit() {
    this.generalService.currentAirtimeDetails.subscribe((data) => {
      //we can add checks, but i don't it's necessary since you can't get to this page without your details.
      this.accountNumber = data.sourceAccountNumber;
      this.phoneNo = data.customerMobile;
      this.carrier = data.mobileOperatorDescription;
      this.amount = data.transactionAmount;
    });
  }

  downloadInvoice() {
    this.content = document.getElementById('PrintInvoice').innerHTML;
    const options: PDFGeneratorOptions = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'Transfer.pdf',
    };
    this.pdfGenerator
      .fromData(this.content, options)
      .then((base64) => {
        //console.log('OK', base64);
      })
      .catch((error) => {
        //console.log('error', error);
      });
  }
}
