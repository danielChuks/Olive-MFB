import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AuthService } from '../guards/auth.service';

@Component({
  selector: 'app-new-tab',
  templateUrl: './new-tab.page.html',
  styleUrls: ['./new-tab.page.scss'],
})
export class NewTabPage implements OnInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  constructor(
    private router: Router,
    private _location: Location,
    public alertController: AlertController,
    private platform: Platform,
    private auth: AuthService
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {}

  initializeApp() {
    this.platform.ready().then(() => {});

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      // eslint-disable-next-line no-underscore-dangle
      if (this._location.isCurrentPathEqualTo('/new-tab/hometab')) {
        // Show Exit Alert!
        this.showExitConfirm();
        processNextHandler();
      }
      // eslint-disable-next-line no-underscore-dangle
      else if (this._location.isCurrentPathEqualTo('/')) {
        // Navigate to back page
        // //console.log('Navigate to back page');
        // // eslint-disable-next-line no-underscore-dangle
        // this._location.back();
        //console.log('Close app!');
        // eslint-disable-next-line @typescript-eslint/dot-notation
        navigator['app'].exitApp();
      } else {
        // Navigate to back page
        //console.log('Navigate to back page');
        // eslint-disable-next-line no-underscore-dangle
        this._location.back();
      }
    });
  }

  showExitConfirm() {
    this.alertController
      .create({
        // header: 'App termination',
        message: 'Do you want to close the app?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Stay',
            role: 'cancel',
            handler: () => {
              //console.log('Application exit prevented!');
            },
          },
          {
            text: 'Exit',
            handler: () => {
              // eslint-disable-next-line @typescript-eslint/dot-notation
              this.auth.logout();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
