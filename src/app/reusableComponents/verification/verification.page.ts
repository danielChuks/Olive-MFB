import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { validateOtpModel } from 'src/app/forgot-password/validateOtpModel';
import { ForgotPasswordService } from 'src/app/forgot-password/forgot-password.service';
import { GeneralServiceService } from 'src/app/general-service.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/guards/auth.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit, OnDestroy {


   convertedPin;
  accountNumber;
  countdownTime = 120; // adjust this value as needed
  disableResendButton = true;
  validateOtp = new validateOtpModel();
  actionType: string;  // To store the action type

   private createPasscodeValues: number[] = [];
  private httpSubscriptions: Subscription[] = [];

  constructor(private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private forgotPasswordService: ForgotPasswordService,
    private generalService: GeneralServiceService,
    private profileService: ProfileService,
      private authService: AuthService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.actionType = params['action'];
    });
  }

   //call transaction history everytime the component mounts
  ionViewWillEnter() {
    this.accountNumber = sessionStorage.getItem('accountNumber');
    this.generateOtp();
     this.startCountdown();
  }

  loader = async () => {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      cssClass: 'custom-loading',
    });
    return loading;
  };




  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

    backClicked() {
    this.location.back();
    }
   //change password or pin depending on the action type
  changePasswordOrPin() {
    if (this.actionType === 'changePin') {
      this.changePin();
      return;
    }
    else {
      this.changePassword();
    }
  }

  async changePin() {
    const loading = await this.loader();
    loading.present();
    let requestData: any;
    this.generalService.pinChangeData.subscribe((data) => {
      requestData = data;
    });
 this.httpSubscriptions.push(this.profileService
            .changeTransactionPin(requestData)
            .subscribe(
              (data) => {
                // console.log(data);
                loading.dismiss();
                this.router.navigateByUrl('/success-page');
              },
              (err) => {
                loading.dismiss();
                this.presentAlert(err.message);
              }
            ));
  }

  async changePassword() {
     const loading = await this.loader();
    loading.present();
    let passwordData: any;
    this.generalService.passwordChangeData.subscribe((data) => {
      passwordData = data;
    });
 this.httpSubscriptions.push(this.profileService.changePassword(passwordData).subscribe(
        (data) => {
          loading.dismiss();
          this.presentAlert(data.responseMessage);
          setTimeout(() => this.authService.logout(), 2000);
        },

        (err) => {
          loading.dismiss();
          console.log(err);
          this.presentAlert(err.error?.message || err.error?.oldPassword || err.error?.newPassword);
        }
      ));
  }

      //generate otp
    generateOtp() {
    this.httpSubscriptions.push(this.forgotPasswordService
      .requestOtp(this.accountNumber)
      .subscribe(
        (data) => {},
        (err) => {
          console.log(err);
          this.presentAlert('Unable to generate Otp for this Account Number');
        }
      ));
  }

  //resend OTP
  resendOtp() {
    this.generateOtp();
    this.countdownTime = 120;
    this.startCountdown();
  }

   startCountdown() {
    this.disableResendButton = true;
    const interval = setInterval(() => {
      this.countdownTime--;
      if (this.countdownTime === 0) {
        clearInterval(interval);
        this.disableResendButton = false; // set to false to enable the button
      }
    }, 1000);
   }

  async addNumber(num: number) {
    if (this.createPasscodeValues.length !== 6) {
      this.createPasscodeValues.push(num);
      for (let i = 0; i < this.createPasscodeValues.length; i++) {
        document.getElementById(`generateotp${i}`).classList.add('test');
      }
      if (this.createPasscodeValues.length === 6) {
    const loading = await this.loader();
    loading.present();
        this.convertedPin = this.createPasscodeValues
          .toString()
          .replace(/,/g, ''); //  convert array values to string
        this.validateOtp.otp = this.convertedPin;
        this.validateOtp.accountNumber = this.accountNumber;
        this.httpSubscriptions.push(
          this.forgotPasswordService.validateOtp(this.validateOtp).subscribe(
            (data) => {
              loading.dismiss();
              //decide which function to call if otp is correct
                  this.changePasswordOrPin();
            },
            (err) => {
              loading.dismiss();
              this.presentAlert(err.error?.message || 'Unable to reach server');
            }
          )
        );
      }
    }
  }

  removeNumber() {
    this.createPasscodeValues.pop();
    for (let i = this.createPasscodeValues.length; i >= 0; i++) {
      document.getElementById(`generateotp${i}`).classList.remove('test');
      break;
    }
  }


   ngOnDestroy() {
    this.httpSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

}
