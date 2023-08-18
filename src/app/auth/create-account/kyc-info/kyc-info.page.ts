/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { GeneralServiceService } from 'src/app/general-service.service';
import { CreateAccountService } from '../create-account.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-kyc-info',
  templateUrl: './kyc-info.page.html',
  styleUrls: ['./kyc-info.page.scss'],
})
export class KycInfoPage implements OnInit, OnDestroy {
  kycData: FormGroup;
  fileUploadObject: any = {
    imageUrl: '',
    signatureUrl : ''
  };
  accountCreationData: object;
   private httpSubscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private generalService: GeneralServiceService,
    private loadingCtrl: LoadingController,
    private createAccountService: CreateAccountService) {
    this.kycData = this.formBuilder.group({
      bvn: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
   }

  ngOnInit() {
    //get data from contact form
    this.getExistingData();
  }

  getExistingData = () => {
    this.generalService.accountCreationData.subscribe(data => {
      this.accountCreationData = data;
      // console.log(data);
    });
  };

    async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  get bvn() {
    return this.kycData.get('bvn');
  }


  async createAccount(data) {
    const loading = await this.loadingCtrl.create({
      cssClass: 'custom-loading',
    });
    loading.present();

    console.log({
      ...this.accountCreationData,
      image: this.fileUploadObject.imageUrl,
      signature: this.fileUploadObject.signatureUrl
    });

    const accountCreationDetails = {
      ...this.accountCreationData,
      bvn: '',
      image: this.fileUploadObject.imageUrl,
      signature: this.fileUploadObject.signatureUrl
    };

   this.httpSubscriptions.push(this.createAccountService.handleCreateAccount(accountCreationDetails).subscribe(response => {
      loading.dismiss();
      this.generalService.updateAccountResponse(response); //set response to state so it can be used in receipt
      console.log(response);
      this.router.navigateByUrl('/successpage');
    },
      (err) => {
        // console.log(err);
        this.presentAlert('An error occured, please try again later');
        loading.dismiss();
      }
    ));
  }


   //handle image upload
  handleImageUpload(e, fileType) {
    const file = e.target.files[0];

    //check if image size is more than 3mb
    if (file.size > 3145728) {
      this.presentAlert('image size should not exceed 3MB');
      e.target.value = '';
      return;
    }

    //use file Reader api to generate image url
     if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
       reader.onload = (event) => {
         if (fileType === 'signature') {
                    this.fileUploadObject.signatureUrl = event.target.result;
         }
         else {
            this.fileUploadObject.imageUrl = event.target.result;
         }

       };
         }
    };

    ngOnDestroy() {
  if (this.httpSubscriptions.length > 0) {
      this.httpSubscriptions.forEach((subscription) =>
        subscription.unsubscribe()
      );
    }
  }
}


