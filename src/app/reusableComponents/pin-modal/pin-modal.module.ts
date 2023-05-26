import { CommonModule } from '@angular/common';
import { NgModule,  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PinModalComponent } from './pin-modal.component';


@NgModule ({
    imports: [CommonModule, IonicModule, FormsModule,
      ReactiveFormsModule],
    exports: [PinModalComponent],
    declarations: [PinModalComponent]
  })

  export class PinModalModule {}
