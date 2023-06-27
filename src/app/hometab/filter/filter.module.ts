import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FilterComponent } from './filter.component';

@NgModule({
  declarations: [
    FilterComponent, // Add your component here
  ],
  imports: [
    CommonModule,
    IonicModule, // Add IonicModule here
  ],
})
export class FilterModule {}
