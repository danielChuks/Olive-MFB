import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from 'src/app/general-service.service';

@Component({
  selector: 'app-successpage',
  templateUrl: './successpage.page.html',
  styleUrls: ['./successpage.page.scss'],
})
export class SuccesspagePage implements OnInit {

  username = 'Adewale Charles Ojo';
  accountNumber: string;
  constructor( private generalService: GeneralServiceService) { }

  ngOnInit() {
    this.getCustomerDetails();
  }

getCustomerDetails = ()=>{
 this.generalService.accountResponse.subscribe((data)=>{
  this.accountNumber = data?.accountNumber;
  console.log(data);
 });
};
}
