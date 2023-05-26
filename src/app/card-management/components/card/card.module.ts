import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../../card.service';
import { CardComponent } from './card.component';
import { IonicModule } from '@ionic/angular';
import { ProfileService } from 'src/app/profile/profile.service';



@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CardComponent],
  providers:[CardService,ProfileService]
})
export class CardModule { }
