import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceHotelService } from './service/service-hotel.service';
import { ServiceHotelModel } from './models/service-hote.model';

@Component({
  selector: 'cons-hotel-service',
  templateUrl: './hotel-service.component.html',
  styleUrls: ['./hotel-service.component.scss']
})
export class ServiceHotelComponent implements OnInit{
  servicehotel: ServiceHotelModel[] = [];
project: any;
  constructor(private servicehotelService: ServiceHotelService, private router: Router) { }

  private getServiceHotel(): void {
    this.servicehotelService.getServiceHotelList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.servicehotel= res.content;
      }
    })
  }
  ngOnInit() {
    this.getServiceHotel();
  }


}
