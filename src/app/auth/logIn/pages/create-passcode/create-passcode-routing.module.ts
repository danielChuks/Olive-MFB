import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePasscodePage } from './create-passcode.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePasscodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePasscodePageRoutingModule {}
