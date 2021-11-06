import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { ModalInfoPageModule } from '../modal-info/modal-info.module';
import { ModalInfoPageRoutingModule } from '../modal-info/modal-info-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    ModalInfoPageRoutingModule,
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
