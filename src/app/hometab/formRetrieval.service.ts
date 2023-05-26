
import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})

export class FormRetrievalService {

  constructor(private nativeStorage: NativeStorage) { }

  async saveFormData(accountNo, bankNm, bAccountNo, bNarration, bAmount, bAccountName){
    const formData = {
      accountNo,
      bankNm,
      bAccountNo,
      bNarration,
      bAmount,
      bAccountName
    };
    //console.log(formData);
    try {
      await this.nativeStorage.setItem('formData', formData);
    } catch (error) {
      console.error('Error storing form data', error);
    }
  }


  async retrieveFormData(callback) {
    try {
      const formData = await this.nativeStorage.getItem('formData');
      callback({
        accountNumber: formData.accountNo,
        beneficiaryAccountName: formData.bAccountName,
        benAcctNo: formData.bAccountNo,
        benAmount: formData.bAmount,
        benNarration: formData.narration,
        bankName: formData.bankNm
      });
    } catch (error) {
      console.error('Error retrieving form data', error);
    }
  }


  //Internal Transfer FormRetrieval
  async saveInternalFormData(accountNo, bAccountNo, bNarration, bAmount, bAccountName){
    const formData2 = {
      accountNo,
      bAccountNo,
      bNarration,
      bAmount,
      bAccountName
    };
    //console.log(formData2);
    try {
      await this.nativeStorage.setItem('formData2', formData2);
    } catch (error) {
      console.error('Error storing form data', error);
    }
  }

  async retrieveInternalFormData(callback) {
    try {
      const formData2 = await this.nativeStorage.getItem('formData2');
      callback({
        accountNumber: formData2.accountNo,
        beneficiaryAccountName: formData2.bAccountName,
        benAcctNo: formData2.bAccountNo,
        benAmount: formData2.bAmount,
        benNarration: formData2.narration,
      });
    } catch (error) {
      console.error('Error retrieving form data', error);
    }
  }


  //Top Up FormRetrieval
  async saveTopUpFormData(accountNo, bmobileNumber, bNarration, bAmount, bAccountName){
    const formData3 = {
      accountNo,
      bmobileNumber,
      bNarration,
      bAmount,
    };
    //console.log(formData3);
    try {
      await this.nativeStorage.setItem('formData3', formData3);
    } catch (error) {
      console.error('Error storing form data', error);
    }
  }

  async retrieveTopUpFormData(callback) {
    try {
      const formData3 = await this.nativeStorage.getItem('formData3');
      callback({
        accountNumber: formData3.accountNo,
      });
    } catch (error) {
      console.error('Error retrieving form data', error);
    }
  }

}



