import { Component, OnDestroy, OnInit } from '@angular/core';
import { ParkingService } from '../services/parking.service';

@Component({
  selector: 'app-parking-view',
  templateUrl: './parking-view.page.html',
  styleUrls: ['./parking-view.page.scss'],
})
export class ParkingViewPage implements OnInit {

  constructor(private parkingService:ParkingService) { }

  parkins:any = this.parkingService.getParkins().then(data=>data.Body)
  ngOnInit() {
  }  
}