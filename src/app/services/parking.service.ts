import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getParkins =()=>
    this.http.post<any>(
      'https://ad6c9l4esl.execute-api.us-east-2.amazonaws.com/Lugar/lugar',
      {"Request": "All", "Lugar": "1", "Status": 1},
      this.httpOptions )
    .toPromise()
    .then(data => data)
}
