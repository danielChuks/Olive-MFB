import { Component, OnInit } from '@angular/core';
import { TopUpService } from '../../top-up.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.scss'],
})
export class CarrierComponent implements OnInit {
  billers;
  billerName = 'Select Biller';

  constructor(
    private topupService: TopUpService,
    private modalCtrl: ModalController
  ) {}

  confirm(billerName, billerId) {
    return this.modalCtrl.dismiss({ billerName, billerId }, 'confirm');
  }

  ngOnInit() {
    this.topupService.getBillersList().subscribe(
      (data) => {
        this.billers = data.billers;
      },

      (err) => {}
    );
  }
}
