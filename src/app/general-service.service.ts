/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GeneralServiceService {
  //internal transfer
  private initialMessage = new BehaviorSubject<any>('');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentMessage = this.initialMessage.asObservable();

  //external transfer
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private setExternalBeneficiary = new BehaviorSubject<any>(''); //subscribe ro receive new data
  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentBeneficiary = this.setExternalBeneficiary.asObservable(); //call to set new dat

  private setAccountNum = new BehaviorSubject<any>('');

  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentAccountNum = this.setAccountNum.asObservable();

  private setAirtimeDetails = new BehaviorSubject<any>('');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentAirtimeDetails = this.setAirtimeDetails.asObservable();

  private setExternalBeneficiaryDetails = new BehaviorSubject<any>('');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentBeneficiaryDetails = this.setExternalBeneficiaryDetails.asObservable();

  private setName = new BehaviorSubject<any>('');
  // eslint-disable-next-line @typescript-eslint/member-ordering
  currentName = this.setName.asObservable();

  setOldPin = new BehaviorSubject<any>('');

  setNewPin = new BehaviorSubject<any>('');

  private forgotPinDetails = new BehaviorSubject<any>('');
  setForgotPindetails = this.forgotPinDetails.asObservable();

  signUpDetails = new BehaviorSubject<any>('');
  getcreatedPin = new BehaviorSubject<any>('');
  pinChangeData = new BehaviorSubject<any>('');
  passwordChangeData = new BehaviorSubject<any>('');
  accountCreationData = new BehaviorSubject<any>('');
  accountResponse =  new BehaviorSubject<any>('');

  constructor(private alertController: AlertController) { }

  //account creation response
  updateAccountResponse(details: object){
    this.accountResponse.next(details);
  }

  //account creation information
  updateAccountData(details: object) {
    this.accountCreationData.next(details);
  }

  //get/update signup data
  updateSignUpDetails(details: object){
    this.signUpDetails.next(details);
  }

  setPinChangeData(data: object) {
    this.pinChangeData.next(data);
  }

  setPasswordChangeData(data: object) {
    this.passwordChangeData.next(data);
  }

  //set newly created pin
  setCreatedPin(pin: string) {
    this.getcreatedPin.next(pin);
  }

      //update internal transfer
  updateMessage(accountNo: any) {
    this.initialMessage.next(accountNo);
  }

    //update external transfer
  updateExternal(details: any) {
    this.setExternalBeneficiary.next(details);
  }

  updateAccountNum(accountNo: any) {
    this.setAccountNum.next(accountNo);
  }

  updateAirtimeDetails(airtimeDetails: any) {
    this.setAirtimeDetails.next(airtimeDetails);
  }

  updateExternalBeneficiaryDetails(externalBenDetails: any) {
    this.setExternalBeneficiaryDetails.next(externalBenDetails);
  }

  updateName(details: any) {
    this.setName.next(details);
  }

  //change pin
  updateOldPin(pin: any) {
    this.setOldPin.next(pin);
  }

  //changepin
  updateNewPin(pin: any) {
    this.setNewPin.next(pin);
  }


  //change pin
  updatePinDetails(details: any) {
    this.forgotPinDetails.next(details);
  }
  async  loader() {
    const loading = await this.alertController.create({
     message: 'Service not available, please try again',
     cssClass: 'custom-loading',
     });
     loading.present();
 }

 async alert(text){
  const loading = await this.alertController.create({
    message: text,
    cssClass: 'custom-loading',
    });
    loading.present();
}

formatAmount(input: string){
  const formattedValue = input.replace(/,/g, '').replace(/[^\d\.]/g, ''); // remove all commas and non-numeric characters
  const parts = formattedValue.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';
  const integerDisplayValue = integerPart.replace(/\d(?=(\d{3})+$)/g, '$&,'); // add commas to integer part
  const displayValue = decimalPart ? integerDisplayValue + '.' + decimalPart : integerDisplayValue; // add decimal part if present
return displayValue;
}

}
