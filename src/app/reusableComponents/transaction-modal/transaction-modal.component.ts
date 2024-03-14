import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import {
  PDFGenerator,
  PDFGeneratorOptions,
} from '@ionic-native/pdf-generator/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.scss'],
})
export class TransactionModalComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  name: string;
  message = '';
  getSelectedHistory;
  content: string;

  constructor(
    private route: Router,
    private modalCtrl: ModalController,
    private pdfGenerator: PDFGenerator,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit() {
    this.getSelectedHistory = JSON.parse(
      sessionStorage.getItem('selectedHistory')
    );
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = '${ev.detail.data}';
    }
  }


  downloadInvoice() {
    this.content = document.getElementById('PrintInvoice').innerHTML;
    const options: PDFGeneratorOptions = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'Transaction.pdf',
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
        'Receipt',
        `data:application/pdf;base64,${base64}`, // Attach the PDF as base64 data
        null // URL (optional)
      );
      console.log('Shared PDF successfully');
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
  }
}
