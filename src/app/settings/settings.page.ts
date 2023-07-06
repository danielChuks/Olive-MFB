import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(     private router: Router,
    ) { }

  ngOnInit() {
  }

  openChangePin() {
    this.router.navigateByUrl('/change-pin-old');
  }

  openForgotPin() {
    this.router.navigateByUrl('/forgot-pin');
  }

  openChangePassword() {
    this.router.navigateByUrl('/change-password');
  }

  openPersonalData() {
    this.router.navigateByUrl('/new-tab/profile/change-personaldata');
  }
}
