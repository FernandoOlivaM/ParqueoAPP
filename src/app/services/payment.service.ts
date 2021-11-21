import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getAlltickts = () =>
    this.http.post<any>(
      'https://ohd84j9so7.execute-api.us-east-2.amazonaws.com/GetTicket/getticket',
      { "Request": "All" },
      this.httpOptions)
      .toPromise()
      .then(data => data)

  payParking = (id, total) =>
    this.http.post<any>(
      'https://1a4jnqc5yd.execute-api.us-east-2.amazonaws.com/Pago/pago',
      { "Ticket_ID": id, "Monto": total },
      this.httpOptions)
      .toPromise()
      .then(data => data)
}
