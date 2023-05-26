import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.page.html',
  styleUrls: ['./signup2.page.scss'],
})
export class Signup2Page implements OnInit {
  segmentModel = '1';
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  _dismiss() {
    this.modalCtrl.dismiss();
  }

  segmentChanged(event) {
  }

  logScrollStart(event) {
  }

  logScrolling(event) {
  }

  logScrollEnd(event) {
  }
}
