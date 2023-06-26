import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdleTimerService } from './idle-timer.service';
import { AlertController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showSpinner = false;

  constructor(
    private idleTimer: IdleTimerService,
    private alertController: AlertController,
  ) {}

  ngOnInit(): void {
    this.idleTimer.startIdleTime();
    this.idleTimer.start();
  }

  ngOnDestroy(): void {
    this.idleTimer.stopIdleTime();
  }

  async presentAlert(msg: string): Promise<void> {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}

// ngOnInit(): void {
//   this.idleTimer.startIdleTime();
//   this.idleTimer.start();
// }

// ngOnDestroy(): void {
//   this.idleTimer.stopIdleTime();
// }

// start() {
//   document.addEventListener('visibilitychange', () => {
//     if (document.visibilityState === 'hidden') {
//       // Check if the current page is an excluded page
//       if (!this.isExcludedPage()) {
//         this.timer = setTimeout(() => {
//           this.auth.logout(); // Run auth.logout() after the timeout
//         }, 60000);
//       } else {
//         clearTimeout(this.timer); // Clear the timer without running auth.logout()
//       }
//     } else {
//       clearTimeout(this.timer);
//     }
//   });
// }

// isExcludedPage(): boolean {
//   const excludedPages = ['/signup-form', '/landing-page']; // Add additional excluded pages here
//   const currentUrl = window.location.pathname;
//   return excludedPages.includes(currentUrl);
// }

