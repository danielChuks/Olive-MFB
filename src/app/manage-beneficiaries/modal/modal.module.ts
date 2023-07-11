import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { BeneficiariesService } from '../beneficiaries.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, IonicModule, HttpClientModule ],
  exports:[ModalComponent],
  providers:[BeneficiariesService]
})
export class ModalModule { }
