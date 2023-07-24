/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { IonModal, ModalController, Platform } from '@ionic/angular';
import { RegisterModel } from '../../RegisterModel';
import { AlertController } from '@ionic/angular';
import { GenerateOtpComponent } from 'src/app/reusableComponents/generate-otp/generate-otp.component';
import { ForgotPasswordService } from 'src/app/forgot-password/forgot-password.service';
import { GeneralServiceService } from 'src/app/general-service.service';
import { Subscription } from 'rxjs';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.page.html',
  styleUrls: ['./signup-form.page.scss'],
})
export class SignupFormPage implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal: IonModal;
  register = new RegisterModel();
  createPasscodeValues: number[] = [];
  SignUpForm: FormGroup;
  message = '';
  check = false;

  pwdIcon = 'eye-outline';
  showPwd = false;
  pwdIcons = 'eye-outline';
  showPwds = false;
  private httpSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private generalService: GeneralServiceService,
    private forgotPasswordService: ForgotPasswordService,
    private alertController: AlertController,
    private platform: Platform
  ) {
    this.SignUpForm = this.formBuilder.group(
      {
        accountNumber: ['', [Validators.minLength(10), Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.minLength(8), Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: AbstractControl): { invalid: boolean } {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      return { invalid: true };
    }
  }

  generateOtp() {
    //generate otp
    console.log(this.SignUpForm.get('accountNumber').value);
    this.httpSubscription = this.forgotPasswordService
      .requestOtp(this.SignUpForm.get('accountNumber').value)
      .subscribe(
        (data) => {},
        (err) => {
          console.log(err);
          //  this.presentAlert(err.error.message);  //display error otherwise and not open otp modal
          this.presentAlert('Unable to generate Otp for this Account Number');
        }
      );
  }

  //function for opening otp modal
  async openOtpModal() {
    const modal = await this.modalCtrl.create({
      component: GenerateOtpComponent,
      cssClass: 'full-page-modal',
      backdropDismiss: false,
    });
    modal.present();
    this.generateOtp();
    const { data, role } = await modal.onWillDismiss();
  }

  //picks form details on click of next
  async SignUp(formGroup: FormGroup) {
    this.openOtpModal(); //open modal
    this.register.accountNumber = formGroup.value.accountNumber;
    this.register.password = formGroup.value.confirmPassword;
    this.register.appVersion = 'v3';
    this.register.deviceUIID = "ae49ded2873115c7";
    this.register.currentDate = '31-01-2025';
    // this.register.deviceUIID = Device.uuid;
    //set account number to sharedservice, to be used to validate otp(can be refactored by passing prop directly to the otp component)
    this.generalService.updateAccountNum(
      this.SignUpForm.get('accountNumber').value
    );

    this.generalService.updateSignUpDetails(this.register);
     //store signUpData using behaviour subject
    // sessionStorage.setItem('signUpDetails', JSON.stringify(this.register));
  }

  ngOnInit() {}
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? 'eye-off-outline' : 'eye-outline';
  }

  togglePwds() {
    this.showPwds = !this.showPwds;
    this.pwdIcons = this.showPwds ? 'eye-off-outline' : 'eye-outline';
  }

  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }
}
