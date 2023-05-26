import { Component, OnInit, ViewChild } from '@angular/core';
import { IonApp, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-change-personaldata',
  templateUrl: './change-personaldata.page.html',
  styleUrls: ['./change-personaldata.page.scss'],
})
export class ChangePersonaldataPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  message = '';
  selectedItem: '';
  test: boolean;
  isInput = false;

  private createPasscodeValues: number[] = [];
  constructor() {}

  ngOnInit() {}

  valueChanged(value: '') {
    this.isInput = true;
    if (value === String('email')) {
      return (this.test = true);
    } else {
      return (this.test = false);
    }
  }

  onClickFunc() {
    //console.log('gg');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = '${ev.detail.data}';
    }
  }

  confirm() {
    this.modal.dismiss('confirm');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  addNumber(num: number): void {
    if (this.createPasscodeValues.length !== 6) {
      this.createPasscodeValues.push(num);
    }
    //console.log(this.createPasscodeValues);
  }

  removeNumber() {
    this.createPasscodeValues.pop();
    //console.log(this.createPasscodeValues);
  }
}
