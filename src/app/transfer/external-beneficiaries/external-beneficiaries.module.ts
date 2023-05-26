import { CommonModule } from '@angular/common';
import { NgModule,  } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExternalBeneficiariesComponent } from './external-beneficiaries.component';


@NgModule ({
    imports: [CommonModule, IonicModule],
    exports: [ExternalBeneficiariesComponent],
    declarations: [ExternalBeneficiariesComponent]
  })

  export class ExternalBeneficiariesModule {}
