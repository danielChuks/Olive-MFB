import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.scss'],
})
export class BundleComponent implements OnInit {
  billerId; //gotten from parent component
  billerProducts;

  constructor(private http: HttpClient, private modalCtrl: ModalController) {}

  confirm(productName, productCode, productAmount) {
    return this.modalCtrl.dismiss(
      { productName, productCode, productAmount },
      'confirm'
    );
  }

  ngOnInit() {
    this.http
      .get<any>(
        `${
          environment.baseApi +
          `quickteller` +
          `/billerPaymentItems` +
          `/${this.billerId}`
        }`
      )
      .subscribe(
        (data) => {
          this.billerProducts = data.paymentitems;
        },
        (err) => {
        }
      );
  }
}
