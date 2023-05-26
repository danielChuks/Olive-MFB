import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { PDFGenerator, PDFGeneratorOptions } from '@ionic-native/pdf-generator/ngx';

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


  constructor( private route: Router,
    private modalCtrl: ModalController,
    private pdfGenerator: PDFGenerator,) { }

  ngOnInit() {
   this.getSelectedHistory =  JSON.parse(sessionStorage.getItem('selectedHistory'));
   //console.log(this.getSelectedHistory);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = '${ev.detail.data}';
    }
  }

  // confirm() {
  //   // this.modal.dismiss(this.name, 'confirm');
  //   this.route.navigateByUrl('/pdf-test');
  // }

  downloadInvoice() {
    this.content = document.getElementById('PrintInvoice').innerHTML;
    const options: PDFGeneratorOptions = {
      documentSize: 'A4',
      type: 'share',
      // landscape: 'portrait',
      fileName: 'Transaction.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        //console.log('OK', base64);
      }).catch((error) => {
        //console.log('error', error);
      });

  }

}
