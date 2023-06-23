import { Injectable } from '@angular/core';
import { AuthService } from './guards/auth.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Injectable({
  providedIn: 'root'
})
export class IdleTimerService {
  private timer: any;

  constructor(private auth: AuthService,
    private idle: Idle) { }

    startIdleTime(){
      this.idle.setIdle(60);
      this.idle.setTimeout(90);
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
      this.idle.onTimeout.subscribe(() => {
        this.auth.logout();
      });
      this.idle.onInterrupt.subscribe(() => {
        this.idle.watch();
        this.idle.setIdle(60);
        this.idle.setTimeout(90);
      });
      this.idle.watch();
    }

    stopIdleTime(){
      this.idle.stop();
    }

    onInterrupt() {
  this.stopIdleTime();
  this.startIdleTime();
    }

    start() {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.timer = setTimeout(() => {
            this.auth.logout();
          }, 60000);
        } else {
          clearTimeout(this.timer);
        }
      });
    }
}
