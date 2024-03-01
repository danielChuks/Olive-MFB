import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from '../../../general-service.service';

@Component({
  selector: 'app-bvn-account',
  templateUrl: './bvn-account.page.html',
  styleUrls: ['./bvn-account.page.scss'],
})
export class BvnAccountPage implements OnInit {


  bvnData: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private generalService: GeneralServiceService) {
      this.bvnData = this.formBuilder.group({
      bvn: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });}

  ngOnInit() {
  }

  validateInfo(data) {
    this.generalService.updateAccountData(data.value);
    // console.log(data.value);
  }
}
