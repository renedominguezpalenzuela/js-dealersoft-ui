import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-car-details-min',
  templateUrl: './car-details-min.component.html',
  styleUrls: ['./car-details-min.component.scss']
})
export class CarDetailsMinComponent implements OnInit {

  constructor() { }

  @Input() car_info:any; 
  @Input() car_buy_data: any;
  ngOnInit(): void {
  }

}
