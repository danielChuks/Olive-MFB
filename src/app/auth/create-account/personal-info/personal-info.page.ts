import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from 'src/app/general-service.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {

  personalData: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private generalService: GeneralServiceService) {
    this.personalData = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', []],
      gender: ['', [Validators.required]],
    });
   }

  ngOnInit() {

  }

  //cancel subscription
  validateInfo(data) {
    this.generalService.updateAccountData(data.value);
    // console.log(data.value);
  }

}
