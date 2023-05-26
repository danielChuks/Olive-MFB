import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.page.html',
  styleUrls: ['./fill-form.page.scss'],
})
export class FillFormPage implements OnInit {
  private userDetailsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userDetailsForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: ['', Validators.required],
      lastName: ['', [Validators.required]],
    });
  }

  ngOnInit() {}
}
