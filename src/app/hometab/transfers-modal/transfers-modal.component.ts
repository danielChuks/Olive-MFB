import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-transfers-modal',
  templateUrl: './transfers-modal.component.html',
  styleUrls: ['./transfers-modal.component.scss'],
})
export class TransfersModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController,  private router: Router,) { }

  ngOnInit() { }

  closeModal(type){
    if (type === 'same') {
      this.router.navigateByUrl('/new-tab/hometab/transfer');
      this.modalCtrl.dismiss();
      return;
    }
    else if (type === 'other') {
       this.router.navigateByUrl('/other-transfer');
      this.modalCtrl.dismiss();
       return;
    }
    else {
      this.modalCtrl.dismiss(null, type);
       return;
    }
  }

}
