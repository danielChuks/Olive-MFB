import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from 'src/app/general-service.service';

@Component({
  selector: 'app-successpage',
  templateUrl: './successpage.page.html',
  styleUrls: ['./successpage.page.scss'],
})
export class SuccesspagePage implements OnInit {

  username = '';
  accountNumber: string;
  constructor( private generalService: GeneralServiceService) { }

  ngOnInit() {
    this.getCustomerDetails();
    this.getCustomerName();
  }

getCustomerDetails = ()=>{
 this.generalService.accountResponse.subscribe((data)=>{
  this.accountNumber = data?.accountNumber;
  // console.log(data);
 });
};

//stop gap, name should be gotten from create account response instead of picking name from user input
getCustomerName = ()=>{
this.generalService.accountCreationData.subscribe((data)=>{
  this.username =  `${data?.firstName}  ${data?.lastName}  ${data?.middleName}`;
});
};
}
