import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  ticket:any ={
    Fec_salida: Date,
    Lugar_ID: Number,
    Fec_Ingreso: Date,
    Ticket_ID: String,
  }
  place = 0; // lugar de estacionamiento
  total = 0; // total factura
  cashback = 0; // vuelto 
  amount: Number; // cantidad con la que pago
  cashbackDescription: String ="Hello word"; // detalle del vuelto 
  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
    this.ticket = {
      Fec_salida: new Date(),
      Lugar_ID: 13,
      Fec_Ingreso: new Date(),
      Ticket_ID: "f5aed2f3-4f4d-46b1-a02c-eefce75421a0"
    }
    this.total = this.getTotal()
  }
  getTotal(){
    return 15;
  }
  showModal = async () => {
    const modal = await this.modalCtrl.create({  
      component: ModalInfoPage,
      componentProps: {
        cashbackDescription: this.cashbackDescription,
      }
    });
    await modal.present();    
  }
  search(){
    
  }
}
