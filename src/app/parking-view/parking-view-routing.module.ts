import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkingViewPage } from './parking-view.page';

const routes: Routes = [
  {
    path: '',
    component: ParkingViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingViewPageRoutingModule {}
