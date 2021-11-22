import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tickets: [
    {
      Fec_salida: Date;
      Lugar_ID: Number;
      Fec_Ingreso: Date;
      Ticket_ID: String;
      precio: Number;
      tiempo: string;
    }
  ];

  constructor(private paymentService: PaymentService) {}
  ngOnInit(): void {
    this.search();
  }

  async search() {
    this.tickets = await this.paymentService
      .getAlltickts()
      .then((data) => data.Body);
  }
}
