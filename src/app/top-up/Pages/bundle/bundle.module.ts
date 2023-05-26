import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BundleComponent } from './bundle.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [BundleComponent],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule
  ],
  exports: [BundleComponent]
})
export class BundleModule { }
