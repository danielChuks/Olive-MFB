/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-kyc-info',
  templateUrl: './kyc-info.page.html',
  styleUrls: ['./kyc-info.page.scss'],
})
export class KycInfoPage implements OnInit {
  kycData: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.kycData = this.formBuilder.group({
      bvn: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
   }

  ngOnInit() {

  }

  get bvn() {
    return this.kycData.get('bvn');
  }


  validateInfo(data) {
    console.log(data.value);
  }

}
