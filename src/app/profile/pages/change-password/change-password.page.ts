import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ProfileService } from '../../profile.service';
import { changePasswordModel } from '../../changePasswordModel';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/guards/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  details = new changePasswordModel();
  pwdIcon = 'eye';
  showPwd = false;
  pwdIcons = 'eye';
  showPwds = false;
  pwdIconss = 'eye';
  showPwdss = false;
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private alertController: AlertController,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmNewPassword: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
      },
      // eslint-disable-next-line max-len
      { validator: this.passwordMatchValidator }
    ); //if this validator is true, formgroup returns invalid, i.e validator must return null for that form to be valid
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? 'eye-off' : 'eye';
  }

  togglePwds() {
    this.showPwds = !this.showPwds;
    this.pwdIcons = this.showPwds ? 'eye-off' : 'eye';
  }

  togglePwdss() {
    this.showPwdss = !this.showPwdss;
    this.pwdIconss = this.showPwdss ? 'eye-off' : 'eye';
  }

  passwordMatchValidator(form: AbstractControl): { invalid: boolean } {
    if (
      form.get('newPassword').value !== form.get('confirmNewPassword').value
    ) {
      return { invalid: true };
    }
  }

  async changePassword(formGroup: FormGroup) {
    const loading = await this.loadingCtrl.create({
      message: '',
      cssClass: 'custom-loading',
    });
    loading.present();
    this.details.accountNumber = sessionStorage.getItem('accountNumber');
    this.details.oldPassword = formGroup.value.currentPassword;
    this.details.newPassword = formGroup.value.confirmNewPassword;

    // eslint-disable-next-line max-len
    if (
      this.changePasswordForm.get('newPassword').value ===
        this.changePasswordForm.get('confirmNewPassword').value &&
      this.changePasswordForm.get('newPassword').value !== '' &&
      this.changePasswordForm.get('confirmNewPassword').value !== ''
    ) {
      this.profileService.changePassword(this.details).subscribe(
        (data) => {
          loading.dismiss();
          this.presentAlert(data.responseMessage);
          setTimeout(() => this.authService.logout(), 2000);
        },
        (err) => {
          loading.dismiss();
          this.presentAlert(err.error.message || err.error.oldPassword);
        }
      );
    }
  }

  ngOnInit() {}

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
      backdropDismiss: true,
    });

    await alert.present();
  }
}
