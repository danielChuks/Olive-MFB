import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { changePasswordModel } from '../../changePasswordModel';
import { AlertController } from '@ionic/angular';
import { GeneralServiceService } from 'src/app/general-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit, OnDestroy {
  changePasswordForm: FormGroup;
  details = new changePasswordModel();
  pwdIcon = 'eye';
  showPwd = false;
  pwdIcons = 'eye';
  showPwds = false;
  pwdIconss = 'eye';
  showPwdss = false;

  private httpSubscription: Subscription;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private generalService: GeneralServiceService,
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

    ngOnInit() {}

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
    this.details.accountNumber = sessionStorage.getItem('accountNumber');
    this.details.oldPassword = formGroup.value.currentPassword;
    this.details.newPassword = formGroup.value.confirmNewPassword;

    // eslint-disable-next-line max-len
    if (
      this.changePasswordForm.get('newPassword').value ===
        this.changePasswordForm.get('confirmNewPassword').value &&
      this.changePasswordForm.get('newPassword').value !== '' &&
      this.changePasswordForm.get('confirmNewPassword').value !== ''
    )
    {
          this.generalService.setPasswordChangeData(this.details); //set data to be used for http request
      this.router.navigate(['/verification'], { queryParams: { action: 'changePassword' } });
      this.changePasswordForm.get('currentPassword').setValue('');
      this.changePasswordForm.get('newPassword').setValue('');
       this.changePasswordForm.get('confirmNewPassword').setValue('');
    }
    else{
this.presentAlert('Invalid details, please try again later');
    }
  }




  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
      backdropDismiss: true,
    });

    await alert.present();
  }

   ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
     }
  }
}

