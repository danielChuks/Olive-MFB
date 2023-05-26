import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardManagementPageRoutingModule } from './card-management-routing.module';
import { CardManagementPage } from './card-management.page';
import { CardModule } from './components/card/card.module';
import { CardService } from './card.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardModule,
    CardManagementPageRoutingModule
  ],
  declarations: [CardManagementPage],
  providers:[CardService]
})
export class CardManagementPageModule {}
