import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdleTimerService } from './idle-timer.service';
import { AlertController } from '@ionic/angular';

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
