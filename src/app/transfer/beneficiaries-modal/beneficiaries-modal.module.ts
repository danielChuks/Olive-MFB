import { CommonModule } from '@angular/common';
import { NgModule,  } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BeneficiariesModalComponent } from './beneficiaries-modal.component';


@NgModule ({
    imports: [CommonModule, IonicModule],
    exports: [BeneficiariesModalComponent],
    declarations: [BeneficiariesModalComponent]
  })

  export class BeneficiariesModalModule {}
