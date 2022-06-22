import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  @Input() car_info:any; 
  @Input() car_buy_data: any;
  @Input() kaufvertrag: any;

   constructor() { }

  ngOnInit(): void {
  }

}
