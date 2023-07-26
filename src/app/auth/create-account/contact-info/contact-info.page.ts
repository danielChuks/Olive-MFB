import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.page.html',
  styleUrls: ['./contact-info.page.scss'],
})
export class ContactInfoPage implements OnInit {
  contactData: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.contactData = this.formBuilder.group({
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    get email() {
    return this.contactData.get('email');
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get phone() {
    return this.contactData.get('phone');
  }

  validateInfo(data) {
    console.log(data.value);
  }

}
