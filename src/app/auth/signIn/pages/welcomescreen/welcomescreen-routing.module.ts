import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomescreenPage } from './welcomescreen.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomescreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomescreenPageRoutingModule {}
