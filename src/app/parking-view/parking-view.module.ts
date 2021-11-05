import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkingViewPageRoutingModule } from './parking-view-routing.module';

import { ParkingViewPage } from './parking-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkingViewPageRoutingModule,
  ],
  declarations: [ParkingViewPage]
})
export class ParkingViewPageModule {}
