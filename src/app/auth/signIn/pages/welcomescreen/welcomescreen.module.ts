import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomescreenPageRoutingModule } from './welcomescreen-routing.module';

import { WelcomescreenPage } from './welcomescreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomescreenPageRoutingModule
  ],
  declarations: [WelcomescreenPage]
})
export class WelcomescreenPageModule {}
