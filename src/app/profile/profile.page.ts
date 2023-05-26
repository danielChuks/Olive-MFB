import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { DashboardService } from '../hometab/dashboard.service';
import { AuthService } from '../guards/auth.service';
import { ProfileService } from './profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;

  security = false;
  message = '';
  accountName;
  accountInformation: any;
  initials;
  private httpSubscription: Subscription;

  constructor(
    public app: IonApp,
    private router: Router,
    private dashboardService: DashboardService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  //get initials
  getInitials(name): any {
    let result = '';
    const tokens = name.split(/\s/);
    if (tokens.length === 2) {
      //if user has just two names
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < tokens.length; i++) {
        result += tokens[i].substring(0, 1).toUpperCase();
      }
    } else {
      for (let i = 0; i < tokens.length - 1; i++) {
        result += tokens[i].substring(0, 1).toUpperCase();
      }
    }
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    return result;
  }

  ngOnInit() {
    this.httpSubscription = this.profileService
      .getAccountInformation()
      .subscribe(
        (data) => {
          this.accountInformation = data;
          this.initials = this.getInitials(this.accountInformation.accountName); //get initials
        },

        (err) => {
          //console.log(err);
        }
      );
  }

  openChangePin() {
    this.router.navigateByUrl('/change-pin-old');
  }

  openForgotPin() {
    this.router.navigateByUrl('/new-tab/profile/forgot-pin');
  }

  openChangePassword() {
    this.router.navigateByUrl('/new-tab/profile/change-password');
  }

  openPersonalData() {
    this.router.navigateByUrl('/new-tab/profile/change-personaldata');
  }
  confirm() {
    this.modal.dismiss('confirm');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = '${ev.detail.data}';
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.httpSubscription.unsubscribe();
  }
}
