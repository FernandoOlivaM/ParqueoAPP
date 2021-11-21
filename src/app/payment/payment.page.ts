import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { PaymentService } from '../services/payment.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  ticket: any = {
    Fec_salida: Date,
    Lugar_ID: Number,
    Fec_Ingreso: Date,
    Ticket_ID: String,
  }
  place; // lugar de estacionamiento
  total; // total factura
  cashback = ""; // vuelto 
  amount; // cantidad con la que pago
  cashbackDescription: String = "Hello word"; // detalle del vuelto 
  stayTime: any;
  constructor(
    private modalCtrl: ModalController,
    private paymentService: PaymentService,
  ) { }

  ngOnInit() {

  }
  showModal = async () => {
    await this.paymentService.payParking(this.ticket.Ticket_ID,this.total).then(data => data)
    this.cashbackDescription = this.cashBack(this.amount)
    const modal = await this.modalCtrl.create({
      component: ModalInfoPage,
      componentProps: {
        cashbackDescription: this.cashbackDescription,
      }
    });
    await modal.present();
  }

  async search() {
    this.ticket = await this.paymentService.getAlltickts().then(data => data.Body.filter(ticket => (ticket.Fec_salida === " " && ticket.Lugar_ID === this.place)))
    this.ticket = this.ticket[0]//quitar esta linea  
    this.ticket.Fec_salida = new Date()
    this.ticket.Fec_Ingreso = new Date(this.ticket.Fec_Ingreso)
    this.stayTime = this.ticket.Fec_salida - this.ticket.Fec_Ingreso
    this.total = this.getTotal(this.stayTime)
    this.stayTime = msToTime(this.stayTime)
  }

  getTotal(stayTime) {
    stayTime = stayTime / 60000
    let response
    if (stayTime >= 720) {
      response = 50.00
    } else if (stayTime >= 240) {
      response = 20.00
    } else if (stayTime >= 120) {
      response = 10.00
    } else if (stayTime >= 30) {
      response = 5.00
    } else {
      response = 0.00
    }
    return response
  }
  cashBack(amount){
    if (amount < this.total) { 
      return 'Cantidad insuficiente'
    }
    let tot = amount - this.total
    let q200 = 0
    let q100 = 0
    let q50 = 0
    let q20 = 0
    let q10 = 0
    let q5 = 0
    let q1 = 0
    do {
      if (tot >= 200) {
        tot = tot-200
        q200 = q200+1
      } else if (tot >= 100) {
        tot = tot-100
        q100 = q100+1
      } else if (tot >= 50) {
        tot = tot-50
        q50 = q50+1
      } else if (tot >= 20) {
        tot = tot-20
        q20 = q20+1
      } else if (tot >= 10) {
        tot = tot-10
        q10 = q10+1
      } else if (tot >= 5) {
        tot = tot-5
        q5 = q5+1
      } else {
        tot = tot-1
        q1 = q1+1
      }
    } while (tot > 0)
    let response = 
    `
    Su vuelto es de: 
    Q200 X ${q200}, 
    Q100 X ${q100}, 
    Q50 X ${q50}, 
    Q20 X ${q20}, 
    Q10 X ${q10}, 
    Q5 X ${q5}, 
    Q1 X ${q1}
    `;
    return response
  }
}
function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds: any = Math.floor((duration / 1000) % 60),
    minutes: any = Math.floor((duration / (1000 * 60)) % 60),
    hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}