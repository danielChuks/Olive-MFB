import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from 'src/app/general-service.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.page.html',
  styleUrls: ['./contact-info.page.scss'],
})
export class ContactInfoPage implements OnInit {
  contactData: FormGroup;
  accountCreationData: object;

  constructor(private formBuilder: FormBuilder,
    private generalService: GeneralServiceService) { }

  ngOnInit() {
    this.getExistingData();
     this.contactData = this.formBuilder.group({
      homeAddress: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      emailAddr: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

   getExistingData = () => {
       this.generalService.accountCreationData.subscribe((data) => {
      this.accountCreationData = data;
    });
  };

    // eslint-disable-next-line @typescript-eslint/member-ordering
    get email() {
    return this.contactData.get('emailAddr');
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get phone() {
    return this.contactData.get('mobileNo');
  }

  validateInfo(data) {
    console.log(data.value);
    const contactInformation = data.value;
    this.generalService.updateAccountData({...this.accountCreationData, ...contactInformation});
  }

}
