import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {

  personalData: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.personalData = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: ['', []],
      gender: ['', [Validators.required]],
    });
   }

  ngOnInit() {

  }

  validateInfo(data) {
    console.log(data.value);
  }

}
