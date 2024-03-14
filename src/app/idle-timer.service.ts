import { Injectable } from '@angular/core';
import { AuthService } from './guards/auth.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

const INACTIVITY_TIMEOUT = 120000; // App timeout - 2 minute

@Injectable({
  providedIn: 'root'
})
export class IdleTimerService {
  private inactivityTimer: any;

  constructor(private auth: AuthService,
    private idle: Idle) { }

    private resetTimer() {
      clearTimeout(this.inactivityTimer);
      if (window.location.pathname !== '/signup-form') {
        this.inactivityTimer = setTimeout(() => {
          this.auth.logout();
        }, INACTIVITY_TIMEOUT);
      }
    };

    // eslint-disable-next-line @typescript-eslint/member-ordering
    startWatchingForInactivity() {
      // Attach event listeners for user activity (e.g., clicks, key presses)
      document.addEventListener('click', () => this.resetTimer());
      document.addEventListener('keypress', () => this.resetTimer());

      // Start the inactivity timer
      this.resetTimer();
    }

     // eslint-disable-next-line @typescript-eslint/member-ordering
     stopWatchingForInactivity() {
      // Remove the event listeners when they're no longer needed
      document.removeEventListener('click', () => this.resetTimer());
      document.removeEventListener('keypress', () => this.resetTimer());

      // Clear the inactivity timer
      clearTimeout(this.inactivityTimer);
    }
}
