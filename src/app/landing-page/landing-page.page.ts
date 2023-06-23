import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  constructor(     private platform: Platform,
    private _location: Location,

    ) {     this.initializeApp();
    }

  ngOnInit() {

  }
   initializeApp() {
      this.platform.ready().then(() => {});
      this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        // eslint-disable-next-line no-underscore-dangle
        if (this._location.isCurrentPathEqualTo('/landing-page')) {
          // Show Exit Ale
          // eslint-disable-next-line @typescript-eslint/dot-notation
          navigator['app'].exitApp();
        }
      });
    }

}
